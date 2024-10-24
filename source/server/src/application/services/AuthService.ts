import { User } from '../../domain/entities/User'
import { IRoleRepo } from '../../domain/interfaces/repositories/IRoleRepo'
import { IUserRepo } from '../../domain/interfaces/repositories/IUserRepo'
import { ROLE_CODE } from '../../shared/constants/roleCode'
import { ErrorCode, UserStatus, ValidateRuleType } from '../../shared/enums'
import { BadRequestError } from '../../shared/errors/BadRequestError'
import { ValidateCondition, ValidateResult } from '../../shared/types'
import { generateUUID, incrementCode } from '../../shared/utils/commonUtil'
import { validate } from '../../shared/utils/validator'
import { LoginDto, AuthResponseDto, RegisterUserDto, AuthContext } from '../dtos/AuthDto'
import { UserDtoView } from '../dtos/UserDto'
import { IAuthService } from '../interfaces/IAuthService'
import bcrypt from 'bcrypt'
import { UserMapper } from '../mappers/UserMapper'
import { IJwtService } from '../interfaces/IJwtService'
import { ITokenRepo } from '../../domain/interfaces/repositories/ITokenRepo'
import config from '../../config'
import { Token } from '../../domain/entities/Token'
import { ForbiddenError } from '../../shared/errors/ForbiddenError'

const VALIDATE_REGISTER_CONDITIONS: ValidateCondition<RegisterUserDto>[] = [
  {
    fieldName: 'email',
    rules: [
      {
        type: ValidateRuleType.Email,
      },
    ],
  },
  {
    fieldName: 'password',
    rules: [
      {
        type: ValidateRuleType.Password,
      },
    ],
  },
]

export class AuthService implements IAuthService {
  readonly #userRepo: IUserRepo
  readonly #roleRepo: IRoleRepo
  readonly #tokenRepo: ITokenRepo
  readonly #jwtService: IJwtService

  constructor(
    userRepo: IUserRepo,
    roleRepo: IRoleRepo,
    tokenRepo: ITokenRepo,
    jwtService: IJwtService
  ) {
    this.#userRepo = userRepo
    this.#roleRepo = roleRepo
    this.#tokenRepo = tokenRepo
    this.#jwtService = jwtService
  }

  async refreshToken(refreshToken: string): Promise<AuthResponseDto> {
    // 1. Xác thực refresh token có hợp lệ không
    let decoded: AuthContext
    try {
      decoded = this.#jwtService.verifyRefreshToken(refreshToken) // Giải mã refresh token
    } catch (error) {
      throw new ForbiddenError('Invalid refresh token')
    }

    // 2. Kiểm tra refresh token trong database
    const userId = decoded.userId
    const storedRefreshToken = await this.#tokenRepo.findRefreshTokenByUserId(userId)

    if (storedRefreshToken?.refreshToken !== refreshToken) {
      throw new ForbiddenError('Invalid refresh token')
    }

    // 3. Tạo accessToken mới
    const accessToken = this.#jwtService.createAccessToken(userId, decoded.roleId, decoded.roleCode)

    // (Optional) 4. Có thể tạo lại refreshToken mới và lưu nó vào database
    const newRefreshToken = this.#jwtService.createRefreshToken(userId)
    await this.#tokenRepo.update(storedRefreshToken.id, {
      ...storedRefreshToken,
      refreshToken: newRefreshToken,
      modifiedAt: new Date(),
      modifiedBy: userId,
    })

    // 5. Trả về accessToken và refreshToken mới
    const user = await this.#userRepo.findById(userId)
    if (!user) {
      throw new ForbiddenError('User not found')
    }

    return {
      user: UserMapper.toUserDtoView(user),
      accessToken,
      refreshToken: newRefreshToken, // Trả về refreshToken mới
    }
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = loginDto

    const validateResults: ValidateResult<LoginDto>[] = []
    // 1. Tìm người dùng bằng email
    const user = await this.#userRepo.findByEmail(email)
    if (!user) {
      validateResults.push({
        fieldName: 'email',
        message: 'Email hoặc mật khẩu không đúng',
        value: email,
        errorCode: ErrorCode.WrongEmailOrPassword,
      })
      throw new BadRequestError('', validateResults)
    }

    // 2. Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      validateResults.push({
        fieldName: 'email',
        message: 'Email hoặc mật khẩu không đúng',
        value: email,
        errorCode: ErrorCode.WrongEmailOrPassword,
      })
      throw new BadRequestError('', validateResults)
    }

    const userRole = await this.#roleRepo.findById(user.roleId)
    if (!userRole) {
      throw new ForbiddenError('User Role not exist')
    }

    // 3. Tạo accessToken và refreshToken
    const accessToken = this.#jwtService.createAccessToken(user.id, user.roleId, userRole?.code)
    const refreshToken = this.#jwtService.createRefreshToken(user.id)

    // 4. Lưu refreshToken vào cơ sở dữ liệu
    const expireDate = new Date(new Date().getTime() + config.app.refreshTokenExpireSeconds * 1000)
    await this.#tokenRepo.create({
      id: generateUUID(),
      device: '',
      userId: user.id,
      refreshToken: refreshToken,
      expireDate: expireDate,
      createdAt: new Date(),
      createdBy: user.id,
    })

    // 5. Trả về thông tin người dùng và token
    return {
      user: UserMapper.toUserDtoView(user),
      accessToken,
      refreshToken,
    }
  }

  async register(registerUserDto: RegisterUserDto): Promise<AuthResponseDto> {
    const validateResults: ValidateResult<RegisterUserDto>[] = validate(
      registerUserDto,
      VALIDATE_REGISTER_CONDITIONS
    )
    if (validateResults.length) {
      throw new BadRequestError('', validateResults)
    }

    const existedUser = await this.#userRepo.findByEmail(registerUserDto.email)

    if (existedUser) {
      validateResults.push({
        fieldName: 'email',
        message: 'Email đã tồn tại',
        value: registerUserDto.email,
        errorCode: ErrorCode.EmailExisting,
      })
      throw new BadRequestError('', validateResults)
    }

    const customerRole = await this.#roleRepo.findByCode(ROLE_CODE.CUSTOMER)
    if (!customerRole) throw new BadRequestError('', validateResults)

    const theNewestUser = await this.#userRepo.findTheNewstUser()
    const newUserCode = incrementCode('U', theNewestUser?.code)

    const hashPassword = await bcrypt.hash(registerUserDto.password, 10)
    const userId = generateUUID()
    const user: User = {
      id: userId,
      code: newUserCode,
      email: registerUserDto.email,
      password: hashPassword,
      fullName: registerUserDto.email.split('@')[0],
      phoneNumber: '',
      roleId: customerRole.id,
      status: UserStatus.Active,
      createdAt: new Date(),
      createdBy: userId,
    }

    const accessToken = this.#jwtService.createAccessToken(
      userId,
      customerRole.id,
      customerRole.code
    )
    const refreshToken = this.#jwtService.createRefreshToken(userId)

    const expireDate = new Date(new Date().getTime() + config.app.refreshTokenExpireSeconds * 1000)
    const token: Token = {
      id: generateUUID(),
      device: '',
      refreshToken: refreshToken,
      expireDate: expireDate,
      userId: userId,
      createdAt: new Date(),
      createdBy: userId,
    }

    const dbConnection = await this.#userRepo.openConnection()
    try {
      await dbConnection.startTransaction()
      const newUser = await this.#userRepo.create(user, dbConnection)
      await this.#tokenRepo.create(token, dbConnection)
      await dbConnection.commit()
      dbConnection.closeConnection()

      const viewRoleDto: UserDtoView = UserMapper.toUserDtoView(newUser)

      return {
        user: viewRoleDto,
        accessToken,
        refreshToken,
      }
    } catch (error) {
      dbConnection.rollback()
      dbConnection.closeConnection()
      throw error
    }
  }

  async logout(refreshToken: string): Promise<void> {
    // Xóa refreshToken cụ thể từ cơ sở dữ liệu
    await this.#tokenRepo.deleteByRefreshToken(refreshToken)
  }

  async clearRefreshTokens(): Promise<void> {
    await this.#tokenRepo.deleteAll()
  }
}

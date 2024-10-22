import { IRoleRepo } from '../../../domain/interfaces/repositories/IRoleRepo'

export class DeleteRoleUseCase {
  readonly #roleRepo: IRoleRepo

  constructor(roleService: IRoleRepo) {
    this.#roleRepo = roleService
  }

  async execute(id: string): Promise<boolean> {
    return await this.#roleRepo.delete(id)
  }
}

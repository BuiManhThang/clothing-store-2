import { Card } from '../../../domain/entities/Card'
import { CreateCardDTO, ViewCardDTO } from '../../dtos/CardDTO'
import { ICardRepo } from '../../interfaces/repositories/ICardRepo'
import { CardMapper } from '../../mappers/CardMapper'
import { generateUUID } from '../../../shared/utils/commonUtil'

export class CreateCardUseCase {
  readonly #cardRepo: ICardRepo

  constructor(cardRepo: ICardRepo) {
    this.#cardRepo = cardRepo
  }

  async execute(createCardDto: CreateCardDTO): Promise<ViewCardDTO> {
    const card: Card = {
      id: generateUUID(),
      quantity: createCardDto.quantity,
      colorId: createCardDto.colorId,
      sizeId: createCardDto.sizeId,
      userId: createCardDto.userId,
      productId: createCardDto.productId,
      createdAt: new Date(),
      createdBy: '',
    }

    const newCard = await this.#cardRepo.create(card)

    return CardMapper.toViewCardDTO(newCard)
  }
}

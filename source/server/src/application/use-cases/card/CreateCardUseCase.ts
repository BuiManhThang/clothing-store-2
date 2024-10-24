import { Card } from '../../../domain/entities/Card'
import { CardDtoCreate, CardDtoView } from '../../dtos/CardDto'
import { ICardRepo } from '../../../domain/interfaces/repositories/ICardRepo'
import { CardMapper } from '../../mappers/CardMapper'
import { generateUUID } from '../../../shared/utils/commonUtil'
import { IUserContextService } from '../../interfaces/IUserContextService'

export class CreateCardUseCase {
  readonly #cardRepo: ICardRepo

  constructor(cardRepo: ICardRepo) {
    this.#cardRepo = cardRepo
  }

  async execute(userContextService: IUserContextService | undefined, createCardDto: CardDtoCreate): Promise<CardDtoView> {
    const card: Card = {
      id: generateUUID(),
      quantity: createCardDto.quantity,
      colorId: createCardDto.colorId,
      sizeId: createCardDto.sizeId,
      userId: createCardDto.userId,
      productId: createCardDto.productId,
      createdAt: new Date(),
      createdBy: userContextService?.getCurrentUserId() || '',
    }

    const newCard = await this.#cardRepo.create(card)

    return CardMapper.toCardDtoView(newCard)
  }
}

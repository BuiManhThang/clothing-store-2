import { Card } from '../../../domain/entities/Card'
import { NotFoundError } from '../../../shared/errors/NotFoundError'
import { CardDtoUpdate, CardDtoView } from '../../dtos/CardDto'
import { ICardRepo } from '../../../domain/interfaces/repositories/ICardRepo'
import { CardMapper } from '../../mappers/CardMapper'
import { IUserContextService } from '../../interfaces/IUserContextService'

export class UpdateCardUseCase {
  readonly #cardRepo: ICardRepo

  constructor(cardRepo: ICardRepo) {
    this.#cardRepo = cardRepo
  }

  async execute(userContextService: IUserContextService | undefined, id: string, updatecardDto: CardDtoUpdate): Promise<CardDtoView | null> {
    const oldCard = await this.#cardRepo.findById(id)
    if (!oldCard) throw new NotFoundError('')

    const card: Card = {
      id: oldCard.id,
      quantity: updatecardDto.quantity,
      colorId: updatecardDto.colorId,
      sizeId: updatecardDto.sizeId,
      userId: updatecardDto.userId,
      productId: updatecardDto.productId,
      createdAt: oldCard.createdAt,
      createdBy: oldCard.createdBy,
      modifiedAt: new Date(),
      modifiedBy: userContextService?.getCurrentUserId() || '',
    }

    const updatedCard = await this.#cardRepo.update(id, card)

    if (updatedCard) return CardMapper.toCardDtoView(updatedCard)
    return null
  }
}

import { Card } from '../../../domain/entities/Card'
import { NotFoundError } from '../../../shared/errors/NotFoundError'
import { UpdateCardDTO, ViewCardDTO } from '../../dtos/CardDTO'
import { ICardRepo } from '../../interfaces/repositories/ICardRepo'
import { CardMapper } from '../../mappers/CardMapper'

export class UpdateCardUseCase {
  readonly #cardRepo: ICardRepo

  constructor(cardRepo: ICardRepo) {
    this.#cardRepo = cardRepo
  }

  async execute(id: string, updatecardDTO: UpdateCardDTO): Promise<ViewCardDTO | null> {
    const oldCard = await this.#cardRepo.findById(id)
    if (!oldCard) throw new NotFoundError('')

    const card: Card = {
      id: oldCard.id,
      quantity: updatecardDTO.quantity,
      colorId: updatecardDTO.colorId,
      sizeId: updatecardDTO.sizeId,
      userId: updatecardDTO.userId,
      productId: updatecardDTO.productId,
      createdAt: oldCard.createdAt,
      createdBy: oldCard.createdBy,
      modifiedAt: new Date(),
      modifiedBy: '',
    }

    const updatedCard = await this.#cardRepo.update(id, card)

    if (updatedCard) return CardMapper.toViewCardDTO(updatedCard)
    return null
  }
}

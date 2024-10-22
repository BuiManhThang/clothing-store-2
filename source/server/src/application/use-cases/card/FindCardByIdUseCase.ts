import { ViewCardDTO } from '../../dtos/CardDTO'
import { ICardRepo } from '../../../domain/interfaces/repositories/ICardRepo'
import { CardMapper } from '../../mappers/CardMapper'

export class FindCardByIdUseCase {
  readonly #cardRepo: ICardRepo

  constructor(cardRepo: ICardRepo) {
    this.#cardRepo = cardRepo
  }

  async execute(id: string): Promise<ViewCardDTO | null> {
    const card = await this.#cardRepo.findById(id)
    if (!card) return null
    return CardMapper.toViewCardDTO(card)
  }
}

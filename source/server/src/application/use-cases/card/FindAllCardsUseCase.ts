import { ViewCardDTO } from '../../dtos/CardDTO'
import { ICardRepo } from '../../../domain/interfaces/repositories/ICardRepo'
import { CardMapper } from '../../mappers/CardMapper'

export class FindAllCardsUseCase {
  readonly #cardRepo: ICardRepo

  constructor(cardService: ICardRepo) {
    this.#cardRepo = cardService
  }

  async execute(): Promise<ViewCardDTO[]> {
    const cards = await this.#cardRepo.findAll()
    return cards.map((card) => CardMapper.toViewCardDTO(card))
  }
}

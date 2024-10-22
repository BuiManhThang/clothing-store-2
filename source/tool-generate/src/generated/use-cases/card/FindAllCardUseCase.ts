import { ViewCardDTO } from '../../dtos/CardDTO'
import { ICardRepo } from '../../interfaces/repositories/ICardRepo'
import { CardMapper } from '../../mappers/CardMapper'

export class FindAllCardUseCase {
  readonly #cardRepo: ICardRepo

  constructor(cardService: ICardRepo) {
    this.#cardRepo = cardService
  }

  async execute(): Promise<ViewCardDTO[]> {
    const card = await this.#cardRepo.findAll()
    return card.map((card) => CardMapper.toViewCardDTO(card))
  }
}

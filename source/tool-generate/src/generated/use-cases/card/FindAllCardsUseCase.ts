import { CardDtoView } from '../../dtos/CardDto'
import { ICardRepo } from '../../../domain/interfaces/repositories/ICardRepo'
import { CardMapper } from '../../mappers/CardMapper'

export class FindAllCardsUseCase {
  readonly #cardRepo: ICardRepo

  constructor(cardService: ICardRepo) {
    this.#cardRepo = cardService
  }

  async execute(): Promise<CardDtoView[]> {
    const cards = await this.#cardRepo.findAll()
    return cards.map((card) => CardMapper.toCardDtoView(card))
  }
}

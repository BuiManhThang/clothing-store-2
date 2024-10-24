import { ICardRepo } from '../../../domain/interfaces/repositories/ICardRepo'

export class DeleteCardUseCase {
  readonly #cardRepo: ICardRepo

  constructor(cardService: ICardRepo) {
    this.#cardRepo = cardService
  }

  async execute(id: string): Promise<boolean> {
    return await this.#cardRepo.delete(id)
  }
}

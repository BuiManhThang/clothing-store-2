import { ICardRepo } from '../../application/interfaces/repositories/ICardRepo'
import { Card } from '../../domain/entities/Card'
import { BasePostgresRepo } from './BasePostgresRepo'

export class CardPostgresRepo extends BasePostgresRepo<Card> implements ICardRepo {
  constructor() {
    super('cards')
  }
}

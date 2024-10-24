import { Card } from '../../domain/entities/Card'
import { CardDtoView } from '../dtos/CardDto'

export class CardMapper {
  static toCardDtoView(card: Card): CardDtoView {
    return card
  }
}

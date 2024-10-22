import { Card } from '../../domain/entities/Card'
import { ViewCardDTO } from '../dtos/CardDTO'

export class CardMapper {
  static toViewCardDTO(card: Card): ViewCardDTO {
    return card
  }
}

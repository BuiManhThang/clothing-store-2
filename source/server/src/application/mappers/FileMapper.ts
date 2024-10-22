import { File } from '../../domain/entities/File'
import { ViewFileDTO } from '../dtos/FileDTO'

export class FileMapper {
  static toViewFileDTO(file: File): ViewFileDTO {
    return file
  }
}

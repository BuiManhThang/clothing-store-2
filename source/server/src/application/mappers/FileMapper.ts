import { File } from '../../domain/entities/File'
import { FileDtoView } from '../dtos/FileDto'

export class FileMapper {
  static toFileDtoView(file: File): FileDtoView {
    return file
  }
}

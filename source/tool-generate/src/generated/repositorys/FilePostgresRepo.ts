import { IFileRepo } from '../../application/interfaces/repositories/IFileRepo'
import { File } from '../../domain/entities/File'
import { BasePostgresRepo } from './BasePostgresRepo'

export class FilePostgresRepo extends BasePostgresRepo<File> implements IFileRepo {
  constructor() {
    super('files')
  }
}

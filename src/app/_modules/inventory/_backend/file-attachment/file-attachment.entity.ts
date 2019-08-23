import { Entity } from '../../../../_helpers/entity';

export class FileAttachmentEntity extends Entity {
  id: string = null;

  filename: string = null;

  constructor(fileAttachmentEntity?: FileAttachmentEntity) {
    super(fileAttachmentEntity);
  }
}

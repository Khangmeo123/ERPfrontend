import { Entity } from '../../../../_helpers/entity';

export class FileAttachmentEntity extends Entity {
  id: string = null;

  filename: string = null;

  uid: string;

  constructor(fileAttachmentEntity?: FileAttachmentEntity) {
    super(fileAttachmentEntity);
  }
}

export interface IFileAttachmentMap {
  [key: string]: FileAttachmentEntity;
}

import {Entity} from '../../../../_helpers/entity';

export class DocumentEntity extends Entity {
  id: string;

  code: string;

  name: string;

  constructor(documentEntity?: DocumentEntity) {
    super(documentEntity);
  }
}

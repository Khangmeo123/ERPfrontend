import {Entity} from '../../../../_helpers/entity';

export class PositionEntity extends Entity {
  id: string;

  legalEntityId: string;

  code: string;

  name: string;

  constructor(documentEntity?: PositionEntity) {
    super(documentEntity);
  }
}

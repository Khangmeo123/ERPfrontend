import {Entity} from '../../../../_helpers/entity';

export class LegalEntity extends Entity {
  id: string;

  code: string;

  name: string;

  constructor(legalEntity?: LegalEntity) {
    super(legalEntity);
  }
}

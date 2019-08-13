import {Entity} from '../../../../_helpers/entity';

export class TaxTemplateEntity extends Entity {
  id: string;

  typeId: string;

  typeDisplay: string;

  code: string;

  name: string;

  constructor(entity?: TaxTemplateEntity) {
    super(entity);
  }
}

export class TaxTemplateTypeEntity extends Entity {
  id: string;

  code: string;

  name: string;

  display: string;

  constructor(entity?: TaxTemplateTypeEntity) {
    super(entity);
  }
}

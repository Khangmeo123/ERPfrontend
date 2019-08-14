import {Entity} from '../../../../_helpers/entity';
import {TaxTemplateContentEntity} from '../tax-template-content/tax-template-content.entity';

export class TaxTemplateEntity extends Entity {
  id: string;

  typeId: string;

  typeDisplay: string;

  code: string;

  name: string;

  taxTemplateContents: TaxTemplateContentEntity[];

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

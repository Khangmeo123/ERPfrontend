import {Entity} from '../../../../_helpers/entity';

export class SplitRuleEntity extends Entity {
  id: string;

  legalEntityId: string;

  code: string;

  name: string;

  length: number;

  identifierStringStart: number;

  identifierStringEnd: number;

  identifierStringValues: string;

  constructor(entity?: SplitRuleEntity) {
    super(entity);
  }
}

export class SplitRuleContentEntity extends Entity {

  itemFieldId: string;

  itemFieldDisplay: string;

  start: number;

  end: number;

  businessGroupId: string;

  constructor(entity?: SplitRuleContentEntity) {
    super(entity);
  }
}

export class ItemFieldEntity extends Entity {
  id: string;

  code: string;

  name: string;

  display: string;

  constructor(entity?: ItemFieldEntity) {
    super(entity);
  }
}

export class SplitRuleTestEntity extends Entity {
  qrCode: string;

  itemCode: string;

  splitRuleId: string;

  splitRuleDisplay: string;

  mfrDate: string;

  expirationDate: string;

  serial: string;

  constructor(entity?: SplitRuleTestEntity) {
    super(entity);
  }
}

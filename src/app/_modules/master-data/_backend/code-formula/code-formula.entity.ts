import {Entity} from '../../../../_helpers/entity';

export class SplitRuleEntity extends Entity {
  id: string;

  code: string;

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

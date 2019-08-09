import {Entity} from '../../../../_helpers/entity';

export class BinLocationEntity extends Entity {
  id: string;

  code: string;
  name: string;

  constructor(entity?: BinLocationEntity) {
    super(entity);
  }
}

export class BinLocationFieldEntity extends Entity {
  subLevel1: string;

  subLevel2: string;

  subLevel3: string;

  subLevel4: string;

  legalEntityId: string;

  constructor(entity?: BinLocationFieldEntity) {
    super(entity);
  }
}

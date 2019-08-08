import { Entity } from 'src/app/_helpers/entity';

export class CoaEntity extends Entity {
  // sobEntity:
  setOfBookId: string;

  code: string;
  name: string;
  description: string;

  characteristicId: string;
  characteristicDisplay: string;

  parentId: string;
  parentCode: string;

  disabled: boolean;

  constructor(entity?: any) {
    super(entity);
  }
}

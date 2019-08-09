import {Entity} from 'src/app/_helpers/entity';

export class LegalEntity extends Entity {
  setOfBookCode: string;
  setOfBookName: string;
  setOfBookId: string;
  code: string;
  name: string;

  subLevel1: string;
  subLevel2: string;
  subLevel3: string;
  subLevel4: string;

  constructor(legalEntity?: any) {
    super(legalEntity);
  }
}

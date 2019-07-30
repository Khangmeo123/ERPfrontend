import { SearchEntity } from 'src/app/_helpers/search-entity';

export class LegalSearchEntity extends SearchEntity {
  setOfBookId: string;

  code: string;
  name: string;

  constructor(legalSearchEntity?: any) {
    super(legalSearchEntity);
  }
}

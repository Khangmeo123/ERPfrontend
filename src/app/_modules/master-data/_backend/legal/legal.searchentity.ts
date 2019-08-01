import { SearchEntity } from 'src/app/_helpers/search-entity';
import { TextFilter } from '../../../../_shared/models/filters/TextFilter';

export class LegalSearchEntity extends SearchEntity {
  setOfBookId: string;

  legalEntityId: string;

  code: TextFilter = new TextFilter();
  name: TextFilter = new TextFilter();

  constructor(legalSearchEntity?: any) {
    super(legalSearchEntity);
  }
}

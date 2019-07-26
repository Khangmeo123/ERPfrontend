import { SearchEntity } from 'src/app/_helpers/search-entity';
import { TextFilter } from '../../../../_shared/models/filters/TextFilter';

export class CoaSearchEntity extends SearchEntity {
  setOfBookId: string;

  accountCode: TextFilter = new TextFilter();
  accountName: TextFilter = new TextFilter();

  characteristicValue: TextFilter = new TextFilter();

  parentAccountCode: TextFilter = new TextFilter();

  accountDescription: TextFilter = new TextFilter();

  constructor(coaSearchEntity?: any) {
    super(coaSearchEntity);
  }
}

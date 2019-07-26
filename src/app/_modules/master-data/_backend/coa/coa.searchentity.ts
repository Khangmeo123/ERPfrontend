import { SearchEntity } from 'src/app/_helpers/search-entity';
import { TextFilter } from '../../../../_shared/models/filters/TextFilter';

export class CoaSearchEntity extends SearchEntity {
  setOfBookId: string;

  accountNumber: TextFilter = new TextFilter();
  accountName: TextFilter = new TextFilter();

  characteristicId: string = null;
  characteristicName: TextFilter = new TextFilter();

  parentAccountId: string = null;
  parentAccountNumber: TextFilter = new TextFilter();

  description: TextFilter = new TextFilter();

  constructor(coaSearchEntity?: any) {
    super(coaSearchEntity);
  }
}

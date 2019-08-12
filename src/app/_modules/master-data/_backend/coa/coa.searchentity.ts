import { SearchEntity } from 'src/app/_helpers/search-entity';
import { TextFilter } from '../../../../_shared/models/filters/TextFilter';

export class CoaSearchEntity extends SearchEntity {
  setOfBookId: string;
  accountName: TextFilter = new TextFilter();
  code: TextFilter = new TextFilter();
  name: TextFilter = new TextFilter();
  description: TextFilter = new TextFilter();
  characteristicId: string = null;
  parentCode: TextFilter = new TextFilter();

  constructor(coaSearchEntity?: any) {
    super(coaSearchEntity);
  }
}

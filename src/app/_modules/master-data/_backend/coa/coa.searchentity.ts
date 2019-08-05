import { SearchEntity } from 'src/app/_helpers/search-entity';
import { TextFilter } from '../../../../_shared/models/filters/TextFilter';

export class CoaSearchEntity extends SearchEntity {
  setOfBookId: string;

  code: TextFilter = new TextFilter();
  name: TextFilter = new TextFilter();
  description: TextFilter = new TextFilter();

  characteristicId: string;

  parentAccountCode: TextFilter = new TextFilter();

  constructor(coaSearchEntity?: any) {
    super(coaSearchEntity);
  }
}

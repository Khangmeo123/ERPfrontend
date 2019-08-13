import { SearchEntity } from '../../../../_helpers/search-entity';
import { TextFilter } from '../../../../_shared/models/filters/TextFilter';

export class ChartOfAccountSearchEntity extends SearchEntity {

  setOfBookId: string;

  code: TextFilter = new TextFilter();
  name: TextFilter = new TextFilter();

  constructor(coaSearchEntity?: any) {
    super(coaSearchEntity);
  }
}

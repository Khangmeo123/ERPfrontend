import { SearchEntity } from 'src/app/_helpers/search-entity';
import { TextFilter } from '../../../../_shared/models/filters/TextFilter';

export class SobSearchEntity extends SearchEntity {
  code: TextFilter = new TextFilter();
  name: TextFilter = new TextFilter();
  currencyId: TextFilter = new TextFilter();
  coa: TextFilter = new TextFilter();

  constructor(sobSearchEntity?: any) {
    super(sobSearchEntity);
  }
}

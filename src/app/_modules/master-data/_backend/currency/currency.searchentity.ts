import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';
import { SearchEntity } from 'src/app/_helpers/search-entity';

export class CurrencySearchEntity extends SearchEntity {
  code: TextFilter = new TextFilter();
  name: TextFilter = new TextFilter();
  description: TextFilter = new TextFilter();

  constructor(currencySearchEntity?: any) {
    super(currencySearchEntity);
  }
}

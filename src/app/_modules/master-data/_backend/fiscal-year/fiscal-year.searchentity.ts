import { SearchEntity } from 'src/app/_helpers/search-entity';
import { DateFilter } from '../../../../_shared/models/filters/DateFilter';
import { TextFilter } from '../../../../_shared/models/filters/TextFilter';

export class FiscalYearSearchEntity extends SearchEntity {
  setOfBookId: string;

  name: TextFilter = new TextFilter();

  startDate: DateFilter = new DateFilter();
  endDate: DateFilter = new DateFilter();

  inventoryValuationMethod: string = null;
  status: string = null;

  constructor(fiscalYearSearchEntity?: any) {
    super(fiscalYearSearchEntity);
  }
}

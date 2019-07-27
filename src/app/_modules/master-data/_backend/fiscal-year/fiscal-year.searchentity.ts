import { SearchEntity } from 'src/app/_helpers/search-entity';
import { DateFilter } from '../../../../_shared/models/filters/DateFilter';
import { TextFilter } from '../../../../_shared/models/filters/TextFilter';

export class FiscalYearSearchEntity extends SearchEntity {
  setOfBookId: string;

  name: TextFilter = new TextFilter();

  fromDate: DateFilter = new DateFilter();
  toDate: DateFilter = new DateFilter();

  inventoryValuationMethodName: TextFilter = new TextFilter();
  statusName: TextFilter = new TextFilter();

  constructor(fiscalYearSearchEntity?: any) {
    super(fiscalYearSearchEntity);
  }
}

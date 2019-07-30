import { SearchEntity } from 'src/app/_helpers/search-entity';
import { DateFilter } from '../../../../_shared/models/filters/DateFilter';
import { TextFilter } from '../../../../_shared/models/filters/TextFilter';

export class AccountingPeriodSearchEntity extends SearchEntity {
  setOfBookId: string;

  fiscalYearId: string;

  validFrom: DateFilter = new DateFilter();
  validTo: DateFilter = new DateFilter();

  description: TextFilter = new TextFilter();

  constructor(accountingPeriodSearchEntity?: any) {
    super(accountingPeriodSearchEntity);
  }
}

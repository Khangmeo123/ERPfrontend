import { SearchEntity } from 'src/app/_helpers/search-entity';
import { TextFilter } from '../../../../_shared/models/filters/TextFilter';
import { DateFilter } from '../../../../_shared/models/filters/DateFilter';

export class CostCenterSearchEntity extends SearchEntity {
  setOfBookId: string;

  code: TextFilter = new TextFilter();
  name: TextFilter = new TextFilter();
  chartOfAccountCode: TextFilter = new TextFilter();
  validFrom: DateFilter = new DateFilter();
  validTo: DateFilter = new DateFilter();
  description: TextFilter = new TextFilter();

  constructor(costCenterSearchEntity?: any) {
    super(costCenterSearchEntity);
  }
}

import { SearchEntity } from 'src/app/_helpers/search-entity';
import { TextFilter } from '../../../../_shared/models/filters/TextFilter';

export class ExportTaxSearchEntity extends SearchEntity {
  setOfBookId: string;

  name: TextFilter = new TextFilter();

  taxCode: string;
  taxType: string;
  uomId: string;
  taxRate: number;
  description: string;

  constructor(exportTariffSearchEntity?: any) {
    super(exportTariffSearchEntity);
  }
}

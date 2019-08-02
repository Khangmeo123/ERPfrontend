import { SearchEntity } from 'src/app/_helpers/search-entity';
import { TextFilter } from '../../../../_shared/models/filters/TextFilter';

export class ImportTaxSearchEntity extends SearchEntity {
  setOfBookId: string;

  taxCode: string;

  taxType: string;

  name: TextFilter = new TextFilter();

  uomId: string;

  taxRate: number;

  description: string;

  constructor(importTariffSearchEntity?: any) {
    super(importTariffSearchEntity);
  }
}

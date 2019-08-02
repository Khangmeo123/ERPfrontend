import { SearchEntity } from 'src/app/_helpers/search-entity';
import { TextFilter } from '../../../../_shared/models/filters/TextFilter';

export class NaturalResourceTaxSearchEntity extends SearchEntity {
  setOfBookId: string;

  name: TextFilter = new TextFilter();

  taxCode: string;
  taxType: string;
  unitOfMeasureId: string;
  taxRate: number;
  description: string;

  constructor(resoureTariffSearchEntity?: any) {
    super(resoureTariffSearchEntity);
  }
}

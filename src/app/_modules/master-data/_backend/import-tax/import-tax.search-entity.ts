import { SearchEntity } from 'src/app/_helpers/search-entity';
import { TextFilter } from '../../../../_shared/models/filters/TextFilter';
import { NumberFilter } from '../../../../_shared/models/filters/NumberFilter';

export class ImportTaxSearchEntity extends SearchEntity {
  setOfBookId: string;

  code: TextFilter = new TextFilter();
  name: TextFilter = new TextFilter();

  unitOfMeasureId: TextFilter = new TextFilter();
  unitOfMeasureName: TextFilter = new TextFilter();

  rate: NumberFilter = new NumberFilter();
  description: TextFilter = new TextFilter();

  constructor(importTaxSearchEntity?: any) {
    super(importTaxSearchEntity);
  }
}

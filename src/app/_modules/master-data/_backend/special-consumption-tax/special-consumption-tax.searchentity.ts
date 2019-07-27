import { SearchEntity } from 'src/app/_helpers/search-entity';
import { TextFilter } from '../../../../_shared/models/filters/TextFilter';
import { NumberFilter } from '../../../../_shared/models/filters/NumberFilter';

export class SpecialConsumptionTaxSearchentity extends SearchEntity {
    setOfBookId: string;

    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();
    unitOfMeasureName: TextFilter = new TextFilter();
    rate: NumberFilter = new NumberFilter();
    description: TextFilter = new TextFilter();

    constructor(exciseTariffSearchEntity?: any) {
        super(exciseTariffSearchEntity);
    }
}

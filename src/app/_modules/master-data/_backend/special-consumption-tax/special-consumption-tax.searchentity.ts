import { SearchEntity } from 'src/app/_helpers/search-entity';

export class SpecialConsumptionTaxSearchentity extends SearchEntity {
    sobId: string;

    taxCode: string;
    taxTypeId: string;
    uomId: string;
    taxRate: number;
    description: string;

    constructor(exciseTariffSearchEntity?: any) {
        super(exciseTariffSearchEntity);
    }
}

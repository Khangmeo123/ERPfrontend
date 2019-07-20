import { SearchEntity } from 'src/app/_helpers/search-entity';

export class EnvironmentTaxSearchEntity extends SearchEntity {
    sobId: string;
    
    taxCode: string;
    taxType: string;
    uomId: string;
    taxRate: number;
    description: string;

    constructor(environmentTariffSearchEntity?: any) {
        super(environmentTariffSearchEntity);
    }
}

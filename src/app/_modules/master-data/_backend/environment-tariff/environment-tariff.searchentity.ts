import { SearchEntity } from 'src/app/_helpers/search-entity';

export class EnvironmentTariffSearchEntity extends SearchEntity {
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
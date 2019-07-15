import { SearchEntity } from 'src/app/_helpers/search-entity';

export class ExpTariffSearchEntity extends SearchEntity {
    sobId: string;
    taxCode: string;
    taxType: string;
    unitId: string;
    taxRate: number;
    description: string;

    constructor(expTariffSearchEntity?: any) {
        super(expTariffSearchEntity);
    }
}
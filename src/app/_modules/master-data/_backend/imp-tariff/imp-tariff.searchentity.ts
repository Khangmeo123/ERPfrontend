import { SearchEntity } from 'src/app/_helpers/search-entity';

export class ImpTariffSearchEntity extends SearchEntity {
    sobId: string;
    taxCode: string;
    taxType: string;
    unitId: string;
    taxRate: number;
    description: string;

    constructor(impTariffSearchEntity?: any) {
        super(impTariffSearchEntity);
    }
}
import { SearchEntity } from 'src/app/_helpers/search-entity';

export class EnviTariffSearchEntity extends SearchEntity {
    sobId: string;
    taxCode: string;
    taxType: string;
    unitId: string;
    taxRate: number;
    description: string;

    constructor(enviTariffSearchEntity?: any) {
        super(enviTariffSearchEntity);
    }
}
import { SearchEntity } from 'src/app/_helpers/search-entity';

export class ResoureTariffSearchEntity extends SearchEntity {
    sobId: string;
    taxCode: string;
    taxType: string;
    unitId: string;
    taxRate: number;
    description: string;

    constructor(resoureTariffSearchEntity?: any) {
        super(resoureTariffSearchEntity);
    }
}
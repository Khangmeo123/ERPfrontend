import { SearchEntity } from 'src/app/_helpers/search-entity';

export class ResoureTariffSearchEntity extends SearchEntity {
    sobId: string;
    taxCode: string;
    taxTypeId: string;
    unitId: string;
    taxRate: number;
    description: number;

    constructor(resoureTariffSearchEntity: any) {
        super(resoureTariffSearchEntity);
    }
}
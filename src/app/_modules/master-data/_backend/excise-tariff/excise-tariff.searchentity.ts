import { SearchEntity } from 'src/app/_helpers/search-entity';

export class ExciseTariffSearchEntity extends SearchEntity {
    storyBookId: string;
    taxCode: string;
    taxTypeId: string;
    unitId: string;
    taxRate: number;
    description: number;

    constructor(exciseTariffSearchEntity: any) {
        super(exciseTariffSearchEntity);
    }
}
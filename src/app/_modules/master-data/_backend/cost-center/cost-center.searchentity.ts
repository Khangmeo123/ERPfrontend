import { SearchEntity } from 'src/app/_helpers/search-entity';

export class CostCenterSearchEntity extends SearchEntity {
    sobId: string;
    code: string;
    name: string;
    coaId: string;
    fromValid: string;
    toValid: string;
    description: string;

    constructor(costCenterSearchEntity: any) {
        super(costCenterSearchEntity);
    }
}
import { SearchEntity } from 'src/app/_helpers/search-entity';

export class VatEntitySearchEntity extends SearchEntity {
    
    sobId: string;
    taxCode: string;
    taxType: string;
    unitId: string;
    taxRate: number;
    description: string;

    constructor(vatEntitySearchEntity?: any) {
        super(vatEntitySearchEntity);
    }
}
import { SearchEntity } from 'src/app/_helpers/search-entity';

export class VatSearchEntity extends SearchEntity {
    
    sobId: string;
    taxCode: string;
    taxType: string;
    uomId: string;
    taxRate: number;
    description: string;

    constructor(vatSearchEntity?: any) {
        super(vatSearchEntity);
    }
}
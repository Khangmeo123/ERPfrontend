import { SearchEntity } from 'src/app/_helpers/search-entity';

export class ProductSearchEntity extends SearchEntity {
    code: string;
    name: string;
    description: string;
    unitPrice: number;
    uomId: string;
    statusId: string;

    constructor(productSearchEntity: any) {
        super(productSearchEntity);
    }
}
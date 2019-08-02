import { SearchEntity } from 'src/app/_helpers/search-entity';

export class ProductSearchEntity extends SearchEntity {
    code: string;
    name: string;
    description: string;
    unitPrice: number;
    unitOfMeasureId: string;
    statusId: string;

    constructor(productSearchEntity: any) {
        super(productSearchEntity);
    }
}

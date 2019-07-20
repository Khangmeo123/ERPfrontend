import { SearchEntity } from 'src/app/_helpers/search-entity';

export class ItemSearchEntity extends SearchEntity {
    code: string;
    name: string;
    description: string;
    unitPrice: number;
    uomId: string;
    statusId: string;

    constructor(itemSearchEntity: any) {
        super(itemSearchEntity);
    }
}
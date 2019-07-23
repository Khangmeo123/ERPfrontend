import { SearchEntity } from 'src/app/_helpers/search-entity';

export class ItemGroupSearchEntity extends SearchEntity {
    sobId: string;
    legalId: string;


    code: string;
    name: string;
    description: string;


    constructor(itemGroupSearchEntity: any) {
        super(itemGroupSearchEntity);
    }
}
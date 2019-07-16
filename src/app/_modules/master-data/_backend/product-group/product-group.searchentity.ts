import { SearchEntity } from 'src/app/_helpers/search-entity';

export class ProductGroupSearchEntity extends SearchEntity {
    sobId: string;
    legalId:string;


    code:string;
    name:string;
    description:string;

    
    constructor(productGroupSearchEntity: any) {
        super(productGroupSearchEntity);
    }
}
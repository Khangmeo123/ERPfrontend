import { SearchEntity } from 'src/app/_helpers/search-entity';

export class CustomerGroupSearchEntity extends SearchEntity {
    sobId: string;
   
    code:string;
    name:string;

    description:string;

    constructor(customerGroupSearchEntity: any) {
        super(customerGroupSearchEntity);
    }
}
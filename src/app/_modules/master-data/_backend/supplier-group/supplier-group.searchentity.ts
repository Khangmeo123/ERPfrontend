import { SearchEntity } from 'src/app/_helpers/search-entity';

export class SupplierGroupSearchEntity extends SearchEntity {
    sobId: string;
   legalId:string;


    code:string;
    name:string;
    description:string;

    
    constructor(supplierGroupSearchEntity: any) {
        super(supplierGroupSearchEntity);
    }
}
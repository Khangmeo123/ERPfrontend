import { SearchEntity } from 'src/app/_helpers/search-entity';

export class SpecialPriceCustomerSearchEntity extends SearchEntity {
    sobId: string;
    legalId:string;
    supplierId : string;

    productGroupId: string;
    productId:string;
    
    
    fromValid:string;
    toValid: string;

    discount:number;
    description:string;
    
    constructor(specialPriceCustomerSearchEntity: any) {
        super(specialPriceCustomerSearchEntity);
    }
}
import { SearchEntity } from 'src/app/_helpers/search-entity';

export class SpecialPriceSupplierSearchEntity extends SearchEntity {
    sobId: string;
    legalId:string;
    supplierId : string;

    productGroupId: string;
    productId:string;
    
    //tu ngay den ngay
    fromValid:string;
    toValid: string;

    discount:number;
    description:string;
    
    constructor(specialPriceSupplierSearchEntity: any) {
        super(specialPriceSupplierSearchEntity);
    }
}
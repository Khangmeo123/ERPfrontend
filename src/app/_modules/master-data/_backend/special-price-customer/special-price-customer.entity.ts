import { Entity } from 'src/app/_helpers/entity';

export class SpecialPriceCustomerEntity extends Entity {
    // sobEntity:
    sobId: string;
    legalId:string;
    supplierId:string;
    
    //nhom san pham
    productGroupId:string;
    productGroupCode:string;
    productGroupName:string;

    //ma san pham
    productId: string;
    productCode:string;
    productName:string;
    
    //tu ngay den ngay
    fromValid:string;
    toValid: string;

    discount:number;
    description:string;
    
    constructor(specialPriceCustomerEntity: any) {
        super(specialPriceCustomerEntity);
    }
}
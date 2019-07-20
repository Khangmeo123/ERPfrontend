import { Entity } from 'src/app/_helpers/entity';

export class SpecialPriceSupplierEntity extends Entity {
    // sobEntity:
    sobId: string;
    legalId: string;
    supplierId: string;

    //nhom san pham
    itemGroupId: string;
    itemGroupCode: string;
    itemGroupName: string;

    //ma san pham
    itemId: string;
    itemCode: string;
    itemName: string;

    //tu ngay den ngay
    fromValid: string;
    toValid: string;

    discount: number;
    description: string;

    constructor(specialPriceSupplierEntity: any) {
        super(specialPriceSupplierEntity);
    }
}
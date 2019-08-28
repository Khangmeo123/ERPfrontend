import { Entity } from 'src/app/_helpers/entity';

export class GoodsReturn extends Entity{
    documentDate: string;
    dueDate: string;
    employeeId: string;
    remarks: string;
    requesterId: string;
    statusId: string;
    name: string;
    customerDetailId: string;
    customerContactId: string;
    customerContactFullName: string;
    documentNumber: number;
    statusName: string;
    postingDate: string;
    buyerId: string;
    buyerName: string;
    ownerId: string;
    ownerName: string;
    requesterName: string;
    inventoryOrganizationId: string;
    inventoryOrganizationCode: string;
    inventoryOrganizationStreet: string;
    generalDiscountRate: number;
    generalDiscountCost: number;
    salesOrderName: string;
    step: number;
    goodsReturnContents: GoodsReturnContents[];
    freight: number;
    packageDimension: string;
    packageWeight: string;
    
    constructor(goodsReturn?: any) {
        super(goodsReturn);
      }
}



export class GoodsReturnContents extends Entity {
    goodsReturnId: string;
    goodsReturnName: string;
    documentNumber: number = 0;
    itemDetailId: string;
    itemCode: string;
    itemName: string;
    quantity: number = 0;
    unitPrice: number = 0;
    itemDiscountRate: number = 0;
    itemDiscountCost: number = 0;
    taxId: string;
    taxRate: number = 0;
    taxCost: number = 0;
    unitOfMeasureId: string;
    unitOfMeasureName: string;
    unitOfMeasureCode: string;
    salesOrderContentId: string;
    actualReceive: number = 0;
    isSelected: boolean = true;

    constructor(goodsReturnContents?: any) {
        super(goodsReturnContents);
    }
}

export class InventoryOrganizationOfGoodsReturn extends Entity {
    code: string;
    name: string;
    shortName: string;

    constructor(inventoryOrganizationOfGoodsReturn?: any) {
        super(inventoryOrganizationOfGoodsReturn);
    }
}

export class RequesterOfGoodsReturn extends Entity {
    code: string;
    name: string;

    constructor(requesterOfGoodsReturn?: any) {
        super(requesterOfGoodsReturn);
    }
}


export class EmployeeDetailOfGoodsReturn extends Entity {
    code: string;
    name: string;

    constructor(employeeDetailOfGoodsReturn?: any) {
        super(employeeDetailOfGoodsReturn);
    }
}


export class SupplierDetailOfGoodsReturn extends Entity {
    code: string;
    name: string;
    taxCode: string;

    constructor(supplierDetailOfGoodsReturn?: any) {
        super(supplierDetailOfGoodsReturn);
    }
}


export class ItemDetailOfGoodsReturn extends Entity {
    code: string;
    name: string;
    // inventoryOrganizationId: string = null;
    constructor(itemDetailOfGoodsReturn?: any) {
        super(itemDetailOfGoodsReturn);
    }
}

export class TaxOfGoodsReturn extends Entity {
    code: string;
    name: string;
    constructor(taxOfGoodsReturn?: any) {
        super(taxOfGoodsReturn);
    }
}

export class UnitOfMeasureOfGoodsReturn extends Entity {
    code: string;
    name: string;
    type: string;
    description: string;
    constructor(unitOfMeasureOfGoodsReturn?: any) {
        super(unitOfMeasureOfGoodsReturn);
    }
}


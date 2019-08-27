import { Entity } from 'src/app/_helpers/entity';

export class GoodsIssue extends Entity {
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
    goodsIssueContents: GoodsIssueContents[];
    freight: number;
    packageDimension: string;
    packageWeight: string;
    
    constructor(goodsIssue?: any) {
        super(goodsIssue);
      }
}

export class RequesterOfGoodsIssue extends Entity {
    code: string;
    name: string;

    constructor(requesterOfGoodsIssue?: any) {
        super(requesterOfGoodsIssue);
    }
}

export class InventoryOrganizationOfGoodsIssue extends Entity {
    code: string;
    name: string;
    shortName: string;

    constructor(inventoryOrganizationOfGoodsIssue?: any) {
        super(inventoryOrganizationOfGoodsIssue);
    }
}


export class GoodsIssueContents extends Entity {
    goodsIssueId: string;
    goodsIssueName: string;
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

    constructor(goodsIssueContents?: any) {
        super(goodsIssueContents);
    }
}

export class UnitOfMeasureOfGoodsIssue extends Entity {
    code: string;
    name: string;
    type: string;
    description: string;
    constructor(unitOfMeasureOfGoodsIssue?: any) {
        super(unitOfMeasureOfGoodsIssue);
    }
}

export class ItemDetailOfGoodsIssue extends Entity {
    code: string;
    name: string;
    // inventoryOrganizationId: string = null;
    constructor(itemDetailOfGoodsIssue?: any) {
        super(itemDetailOfGoodsIssue);
    }
}

export class TaxOfGoodsIssue extends Entity {
    code: string;
    name: string;
    constructor(taxOfGoodsIssue?: any) {
        super(taxOfGoodsIssue);
    }
}


export class SerialNumberOfGoodsIssue extends Entity {
    goodsIssueContentId: string;
    itemName: string;
    itemCode: string;
    mfrSerialNumber: string;
    serialNumber: string;
    lotNumber: string;
    quantity: number;
    binLocationId: string;
    binLocationCode: string;
    expirationDate: string;
    mfrDate: string;
    admissionDate: string;
    mfrWarrantyStart: string;
    mfrWarrantyEnd: string;
    location: string;
    details: string;
    qrCode: string;
  
    constructor(serialNumberOfGoodsIssue?) {
      super(serialNumberOfGoodsIssue);
    }
  }

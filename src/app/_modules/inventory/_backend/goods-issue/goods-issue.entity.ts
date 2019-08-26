import { Entity } from 'src/app/_helpers/entity';

export class GoodsIssueEntity extends Entity {
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
    
    constructor(goodsIssueEntity?: any) {
        super(goodsIssueEntity);
      }
}

export class RequesterEntity extends Entity {
    code: string;
    name: string;

    constructor(requesterEntity?: any) {
        super(requesterEntity);
    }
}

export class InventoryOrganizationEntity extends Entity {
    code: string;
    name: string;
    shortName: string;

    constructor(inventoryOrganizationEntity?: any) {
        super(inventoryOrganizationEntity);
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

    constructor() {
        super();
    }
}

export class UnitOfMeasureOfIssueEntity extends Entity {
    code: string;
    name: string;
    type: string;
    description: string;
    constructor(unitOfMeasureOfIssueEntity?: any) {
        super(unitOfMeasureOfIssueEntity);
    }
}

export class ItemDetailOfIssueEntity extends Entity {
    code: string;
    name: string;
    // inventoryOrganizationId: string = null;
    constructor(itemDetailOfIssueEntity?: any) {
        super(itemDetailOfIssueEntity);
    }
}

export class TaxOfIssueEntity extends Entity {
    code: string;
    name: string;
    constructor(taxOfIssueEntity?: any) {
        super(taxOfIssueEntity);
    }
}
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
    
    constructor(goodsIssueEntity?: any) {
        super(goodsIssueEntity);
      }
}

export class RequesterEntity extends Entity {
    code: string;
    name: string;

    constructor() {
        super();
    }
}

export class InventoryOrganizationEntity extends Entity {
    code: string;
    name: string;
    shortName: string;

    constructor() {
        super();
    }
}
import { Entity } from 'src/app/_helpers/entity';

export class DeliveryOrder extends Entity{
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
    deliveryContents: DeliveryContents[];
    salesOrders: SalesOrderOfDeliveryOrder[];
    freight: number;
    packageDimension: string;
    packageWeight: string;
    
    constructor(deliveryOrder?: any) {
        super(deliveryOrder);
      }
}



export class DeliveryContents extends Entity {
    deliveryId: string;
    deliveryName: string;
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

    constructor(deliveryContents?: any) {
        super(deliveryContents);
    }
}

export class InventoryOrganizationOfDeliveryOrder extends Entity {
    code: string;
    name: string;
    shortName: string;

    constructor(inventoryOrganizationOfDeliveryOrder?: any) {
        super(inventoryOrganizationOfDeliveryOrder);
    }
}

export class RequesterOfDeliveryOrder extends Entity {
    code: string;
    name: string;

    constructor(requesterOfDeliveryOrder?: any) {
        super(requesterOfDeliveryOrder);
    }
}


export class EmployeeDetailOfDeliveryOrder extends Entity {
    code: string;
    name: string;

    constructor(employeeDetailOfDeliveryOrder?: any) {
        super(employeeDetailOfDeliveryOrder);
    }
}


export class CustomerDetailOfDeliveryOrder extends Entity {
    code: string;
    name: string;
    taxCode: string;

    constructor(customerDetailOfDeliveryOrder?: any) {
        super(customerDetailOfDeliveryOrder);
    }
}


export class CustomerContactOfDeliveryOrder extends Entity {
    customerDetailId: string;
    customerAddress: string;

    constructor(customerContactOfDeliveryOrder?: any) {
        super(customerContactOfDeliveryOrder);
    }
}

export class SalesOrderOfDeliveryOrder extends Entity {
    name: string;
    documentNumber: number;
    documentDate: string;
    ownerId: string;
    ownerName: string;
    salerId: string;
    salerName: string;

    constructor(salesOrderOfDeliveryOrder?: any) {
        super(salesOrderOfDeliveryOrder);
    }
}


export class ItemDetailOfDeliveryOrder extends Entity {
    code: string;
    name: string;
    // inventoryOrganizationId: string = null;
    constructor(itemDetailOfDeliveryOrder?: any) {
        super(itemDetailOfDeliveryOrder);
    }
}

export class TaxOfDeliveryOrder extends Entity {
    code: string;
    name: string;
    constructor(taxOfDeliveryOrder?: any) {
        super(taxOfDeliveryOrder);
    }
}

export class UnitOfMeasureOfDeliveryOrder extends Entity {
    code: string;
    name: string;
    type: string;
    description: string;
    constructor(unitOfMeasureOfDeliveryOrder?: any) {
        super(unitOfMeasureOfDeliveryOrder);
    }
}

export class DocumentNumberOfDeliveryOrder extends Entity {
    name: string;
    documentNumber: number;
    documentDate: string;
    ownerId: string;
    ownerName: string;
    buyerId: string;
    buyerName: string;
    constructor(documentNumberOfDeliveryOrder?: any) {
        super(documentNumberOfDeliveryOrder);
    }
}
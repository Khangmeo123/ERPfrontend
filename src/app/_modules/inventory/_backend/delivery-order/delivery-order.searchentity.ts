import { SearchEntity } from 'src/app/_helpers/search-entity';
import { DateFilter } from 'src/app/_shared/models/filters/DateFilter';
import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';
import { NumberFilter } from 'src/app/_shared/models/filters/NumberFilter';

export class DeliveryOrderSearch extends SearchEntity {
    documentDate: DateFilter = new DateFilter();
    dueDate: DateFilter = new DateFilter();
    employeeId: string = null;
    remarks = new TextFilter();
    requesterId: string = null;
    statusId: string = null;
    name: TextFilter = new TextFilter();
    customerDetailId: string;
    customerContactId: string;
    customerContactFullName: string;
    documentNumber: NumberFilter = new NumberFilter();
    statusName: string;
    postingDate: DateFilter = new DateFilter();
    buyerId: string = null;
    buyerName: string;
    ownerId: string;
    ownerName: string;
    requesterName: string;
    inventoryOrganizationId: string;
    inventoryOrganizationCode: string;
    inventoryOrganizationStreet = new TextFilter();
    generalDiscountRate: number;
    generalDiscountCost: number;
    freight: number;
    packageDimension: string;
    packageWeight: string;


    constructor(deliveryOrderSearch?: any) {
        super(deliveryOrderSearch);
    }
}


export class RequesterOfDeliveryOrderSearch extends SearchEntity {
    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();

    constructor() {
        super();
    }
}

export class InventoryOrganizationOfDeliveryOrderSearch extends SearchEntity {

    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();
    shortName: TextFilter = new TextFilter();

    constructor() {
        super();
    }
}

export class EmployeeDetailOfDeliveryOrderSearch extends SearchEntity {
    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();

    constructor(requesterOfDeliveryOrder?: any) {
        super(requesterOfDeliveryOrder);
    }
}

export class CustomerDetailOfDeliveryOrderSearch extends SearchEntity {
    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();
    taxCode: TextFilter = new TextFilter();

    constructor(customerDetailOfDeliveryOrder?: any) {
        super(customerDetailOfDeliveryOrder);
    }
}

export class CustomerContactOfDeliveryOrderSearch extends SearchEntity {
    customerDetailId: string;
    customerAddress: TextFilter = new TextFilter();

    constructor(customerContactOfDeliveryOrderSearch?: any) {
        super(customerContactOfDeliveryOrderSearch);
    }
}

export class SalesOrderOfDeliveryOrderSearch extends SearchEntity {
    name: string;
    documentNumber: NumberFilter = new NumberFilter();
    documentDate: TextFilter = new TextFilter();
    ownerId: string;
    ownerName: TextFilter = new TextFilter();
    salerId: string;
    salerName: TextFilter = new TextFilter();

    constructor(salesOrderOfDeliveryOrderSearch?: any) {
        super(salesOrderOfDeliveryOrderSearch);
    }
}


export class ItemDetailOfDeliveryOrderSearch extends SearchEntity {
    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();
    // inventoryOrganizationId: string = null;
    constructor(itemDetailOfDeliveryOrder?: any) {
        super(itemDetailOfDeliveryOrder);
    }
}

export class TaxOfDeliveryOrderSearch extends SearchEntity {
    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();
    constructor(taxOfDeliveryOrderSearch?: any) {
        super(taxOfDeliveryOrderSearch);
    }
}

export class UnitOfMeasureOfDeliveryOrderSearch extends SearchEntity {
    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();
    type: string;
    description: string;

    constructor(unitOfMeasureOfDeliveryOrderSearch?: any) {
        super(unitOfMeasureOfDeliveryOrderSearch);
    }
}

export class DocumentNumberOfDeliveryOrderSearch extends SearchEntity {
    name: string;
    documentNumber: NumberFilter = new NumberFilter();
    documentDate: DateFilter = new DateFilter();
    ownerId: string;
    ownerName: TextFilter = new TextFilter();
    buyerId: string;
    buyerName: TextFilter = new TextFilter();
    constructor(documentNumberOfDeliveryOrder?: any) {
        super(documentNumberOfDeliveryOrder);
    }
}
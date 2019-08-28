import { SearchEntity } from 'src/app/_helpers/search-entity';
import { DateFilter } from 'src/app/_shared/models/filters/DateFilter';
import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';
import { NumberFilter } from 'src/app/_shared/models/filters/NumberFilter';

export class GoodsReturnSearch extends SearchEntity {
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


    constructor(goodsReturnSearch?: any) {
        super(goodsReturnSearch);
    }
}


export class RequesterOfGoodsReturnSearch extends SearchEntity {
    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();

    constructor() {
        super();
    }
}

export class InventoryOrganizationOfGoodsReturnSearch extends SearchEntity {

    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();
    shortName: TextFilter = new TextFilter();

    constructor() {
        super();
    }
}

export class EmployeeDetailOfGoodsReturnSearch extends SearchEntity {
    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();

    constructor(requesterOfGoodsReturn?: any) {
        super(requesterOfGoodsReturn);
    }
}

export class SupplierDetailOfGoodsReturnSearch extends SearchEntity {
    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();
    taxCode: TextFilter = new TextFilter();

    constructor(supplierDetailOfGoodsReturnSearch?: any) {
        super(supplierDetailOfGoodsReturnSearch);
    }
}

export class ItemDetailOfGoodsReturnSearch extends SearchEntity {
    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();
    // inventoryOrganizationId: string = null;
    constructor(itemDetailOfGoodsReturn?: any) {
        super(itemDetailOfGoodsReturn);
    }
}

export class TaxOfGoodsReturnSearch extends SearchEntity {
    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();
    constructor(taxOfGoodsReturnSearch?: any) {
        super(taxOfGoodsReturnSearch);
    }
}

export class UnitOfMeasureOfGoodsReturnSearch extends SearchEntity {
    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();
    type: string;
    description: string;

    constructor(unitOfMeasureOfGoodsReturnSearch?: any) {
        super(unitOfMeasureOfGoodsReturnSearch);
    }
}

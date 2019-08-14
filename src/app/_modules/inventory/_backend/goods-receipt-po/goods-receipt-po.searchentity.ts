import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';
import { SearchEntity } from 'src/app/_helpers/search-entity';
import { NumberFilter } from 'src/app/_shared/models/filters/NumberFilter';
import { DateFilter } from 'src/app/_shared/models/filters/DateFilter';

export class GoodsReceiptPOSearchEntity extends SearchEntity {
    name: TextFilter = new TextFilter();
    supplierDetailId: string;
    supplierContactId: string;
    currencyId: string;
    inventoryOrganizationId: string = null;
    inventoryOrganizationStreet = new TextFilter();
    documentNumber: NumberFilter = new NumberFilter();
    documentReferenceId: string;
    statusId: string = null;
    postingDate: DateFilter = new DateFilter();
    dueDate: DateFilter = new DateFilter();
    documentDate: DateFilter = new DateFilter();
    buyerId: string;
    ownerId: string;
    requesterId: string = null;
    remarks = new TextFilter();
    generalDiscountRate: NumberFilter = new NumberFilter();

    constructor(goodsReceiptPOSearchEntity?: any) {
        super(goodsReceiptPOSearchEntity);
    }
};

export class PurchaseOrdersSearchEntity extends SearchEntity {
    supplierDetailId: string;
    documentNumber = new NumberFilter();
    documentDate = new DateFilter();
    ownerId: string = null;
    buyerId: string = null;

    constructor() {
        super();
    }
}
export class GoodsReceiptPORequesterSearchEntity extends SearchEntity {
    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();

    constructor() {
        super();
    }
}

export class GoodsReceiptPOInventoryOrganizationSearchEntity extends SearchEntity {
    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();
    shortName: TextFilter = new TextFilter();

    constructor() {
        super();
    }
}

export class GoodsReceiptPOSupplierSearchEntity extends SearchEntity {
    code = new TextFilter();
    name = new TextFilter();
    constructor() {
        super();
    }
}

export class GoodsReceiptPOSupplierAddressSearchEntity extends SearchEntity {
    supplierAddress = new TextFilter();
    name = new TextFilter();
    supplierDetailId: string;
    constructor() {
        super();
    }
}

export class GoodsReceiptPOTaxSearchEntity extends SearchEntity {
    code = new TextFilter();
    name = new TextFilter();
}

export class GoodsReceiptPOUnitOfMeasureSearchEntity extends SearchEntity {
    name = new TextFilter();
    type = new TextFilter();
    description = new TextFilter();
    code = new TextFilter();
}

export class GoodsReceiptPOItemDetailSearchEntity extends SearchEntity {
    code = new TextFilter();
    name = new TextFilter();
}

export class GoodsReceiptPOBinlocationSearchEntity extends SearchEntity {
    goodsReceiptPOContentId: string;
    code = new TextFilter();
}

export class GoodsReceiptPOContentDetailSearchEntity extends SearchEntity {
    qrCode: string = null;
    itemDetailId: string = null;
    itemName: string = null;
    serialNumber: string = null;
    mfrDate: string = null;
    expirationDate: string = null;
}
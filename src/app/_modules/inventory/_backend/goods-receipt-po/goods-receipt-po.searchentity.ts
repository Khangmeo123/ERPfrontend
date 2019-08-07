import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';
import { SearchEntity } from 'src/app/_helpers/search-entity';
import { NumberFilter } from 'src/app/_shared/models/filters/NumberFilter';
import { DateFilter } from 'src/app/_shared/models/filters/DateFilter';

export class GoodsReceiptPOSearchEntity extends SearchEntity {
    name: TextFilter = new TextFilter();
    supplierDetailId: string;
    supplierContactId: string;
    currencyId: string;
    documentNumber: NumberFilter = new NumberFilter();
    documentReferenceId: string;
    statusId: string;
    postingDate: DateFilter = new DateFilter();
    dueDate: DateFilter = new DateFilter();
    documentDate: DateFilter = new DateFilter();
    buyerId: string;
    ownerId: string;
    requesterId: string;
    remarks: string;
    generalDiscountRate: NumberFilter = new NumberFilter();

    constructor(goodsReceiptPOSearchEntity?: any) {
        super(goodsReceiptPOSearchEntity);
    }
};

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

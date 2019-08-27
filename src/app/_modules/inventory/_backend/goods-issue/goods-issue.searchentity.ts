import { SearchEntity } from 'src/app/_helpers/search-entity';
import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';
import { NumberFilter } from 'src/app/_shared/models/filters/NumberFilter';
import { DateFilter } from 'src/app/_shared/models/filters/DateFilter';

export class GoodsIssueSearch extends SearchEntity {
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


    constructor(goodsIssueSearch?: any) {
        super(goodsIssueSearch);
    }
}

export class RequesterOfGoodsIssueSearch extends SearchEntity {
    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();

    constructor() {
        super();
    }
}

export class InventoryOrganizationOfGoodsIssueSearch extends SearchEntity {

    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();
    shortName: TextFilter = new TextFilter();

    constructor() {
        super();
    }
}

export class UnitOfMeasureOfGoodsIssueSearch extends SearchEntity {
    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();
    type: string;
    description: string;
    constructor(unitOfMeasureOfIssueOfGoodsIssueSearch?: any) {
        super(unitOfMeasureOfIssueOfGoodsIssueSearch);
    }
}

export class ItemDetailOfGoodsIssueSearch extends SearchEntity {
    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();
    constructor(itemDetaiOfGoodsIssueSearch?: any) {
        super();
    }
}

export class TaxOfGoodsIssueSearch extends SearchEntity {
    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();
    constructor(taxOfGoodsIssueSearch?: any) {
        super(taxOfGoodsIssueSearch);
    }
}

export class GoodsIssueContentsSearch extends SearchEntity {
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
    unitOfMeasureName: TextFilter = new TextFilter();
    unitOfMeasureCode: TextFilter = new TextFilter();
    salesOrderContentId: string;
    actualReceive: number = 0;
    isSelected: boolean = true;

    constructor() {
        super();
    }
}

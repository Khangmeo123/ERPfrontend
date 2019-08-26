import { SearchEntity } from 'src/app/_helpers/search-entity';
import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';
import { NumberFilter } from 'src/app/_shared/models/filters/NumberFilter';
import { DateFilter } from 'src/app/_shared/models/filters/DateFilter';

export class GoodsIssueSearchEntity extends SearchEntity {
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


    constructor(goodsIssueSearchEntity?: any) {
        super(goodsIssueSearchEntity);
    }
}

export class RequesterSearchEntity extends SearchEntity {
    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();

    constructor() {
        super();
    }
}

export class InventoryOrganizationSearchEntity extends SearchEntity {

    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();
    shortName: TextFilter = new TextFilter();

    constructor() {
        super();
    }
}

export class UnitOfMeasureOfIssueSearchEntity extends SearchEntity {
    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();
    type: string;
    description: string;
    constructor(unitOfMeasureOfIssueSearchEntity?: any) {
        super(unitOfMeasureOfIssueSearchEntity);
    }
}

export class ItemDetailOfIssueSearchEntity extends SearchEntity {
    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();
    // inventoryOrganizationId: string = null;
    constructor(itemDetailOfIssueSearchEntity?: any) {
        super();
        // if (itemDetailOfIssueSearchEntity) {
        //     this.inventoryOrganizationId = itemDetailOfIssueSearchEntity.inventoryOrganizationId !== null &&
        //         itemDetailOfIssueSearchEntity.inventoryOrganizationId !== undefined ?
        //         itemDetailOfIssueSearchEntity.inventoryOrganizationId : null;
        //     this.existedIds = itemDetailOfIssueSearchEntity.existedIds !== null &&
        //         itemDetailOfIssueSearchEntity.existedIds !== undefined ? itemDetailOfIssueSearchEntity.existedIds : [];
        // }
    }
}

export class TaxOfIssueSearchEntity extends SearchEntity {
    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();
    constructor(taxOfIssueSearchEntity?: any) {
        super(taxOfIssueSearchEntity);
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
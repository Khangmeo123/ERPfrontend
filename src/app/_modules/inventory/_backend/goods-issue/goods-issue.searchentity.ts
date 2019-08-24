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
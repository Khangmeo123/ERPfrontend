import { SearchEntity } from 'src/app/_helpers/search-entity';
import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';
import { DateFilter } from 'src/app/_shared/models/filters/DateFilter';

export class InventoryCountingSearchEntity extends SearchEntity {
    id: string;
    documentNumber: TextFilter = new TextFilter();
    documentDate: DateFilter = new DateFilter();
    inventoryOrganizationId: string = null;
    inventoryOrganizationCode: string;
    inventoryOrganizationName: string;
    inventoryCounterId: string = null;
    ownerId: string = null;
    statusId: string = null;
    statusName: string;
    postingDate: DateFilter = new DateFilter();
    // inventoryCounters: InventoryCountersEntity[];
    constructor(inventoryCountingSearchEntity?: any) {
        super(inventoryCountingSearchEntity);
    }
}


export class InventoryOrganizationOfCountingSearchEntity extends SearchEntity {
    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();
    constructor() {
        super();
    }
}

export class EmployeeDetailOfCountingSearchEntity extends SearchEntity {
    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();
    constructor() {
        super();
    }
}


export class ItemDetailOfCountingSearchEntity extends SearchEntity {
    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();
    inventoryOrganizationId: string;
    constructor() {
        super();
    }
}

export class UnitOfMeasureOfCountingSearchEntity extends SearchEntity {
    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();
    constructor() {
        super();
    }
}


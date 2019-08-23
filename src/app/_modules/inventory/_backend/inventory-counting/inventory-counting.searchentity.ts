import { FormControl } from '@angular/forms';
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
    inventoryOrganizationId: string = null;
    constructor(itemDetailOfCountingSearchEntity?: any) {
        super();
        if (itemDetailOfCountingSearchEntity) {
            this.inventoryOrganizationId = itemDetailOfCountingSearchEntity.inventoryOrganizationId !== null &&
                itemDetailOfCountingSearchEntity.inventoryOrganizationId !== undefined ?
                itemDetailOfCountingSearchEntity.inventoryOrganizationId : null;
            this.existedIds = itemDetailOfCountingSearchEntity.existedIds !== null &&
                itemDetailOfCountingSearchEntity.existedIds !== undefined ? itemDetailOfCountingSearchEntity.existedIds : [];
        }
    }
}

export class UnitOfMeasureOfCountingSearchEntity extends SearchEntity {
    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();
    constructor() {
        super();
    }
}

export class InventoryCounterDetailSearchEntity extends SearchEntity {
    itemDetailId: string = null;
    itemDetailName: string = null;
    unitOfMeasureId: string = null;
}

export class SerialNumberSearchEntity extends SearchEntity {
    qrCode: string = null;
    itemDetailId: string = null;
    itemDetailName: string = null;
    serialNumber: string = null;
    mfrDate: FormControl = new FormControl(null);
    expirationDate: FormControl = new FormControl(null);
}

export class BatchSearchEntity extends SearchEntity {
    qrCode: string = null;
    itemDetailId: string = null;
    itemDetailName: string = null;
    serialNumber: string = null;
    mfrDate: FormControl = new FormControl(null);
    expirationDate: FormControl = new FormControl(null);
}

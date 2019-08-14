import { Entity } from 'src/app/_helpers/entity';

export class InventoryCountingEntity extends Entity {
    id: string;
    documentNumber: string;
    documentDate: string;
    inventoryOrganizationId: string;
    inventoryOrganizationCode: string;
    inventoryOrganizationName: string;
    ownerId: string;
    ownerCode: string;
    ownerName: string;
    statusId: string;
    statusName: string;
    postingDate: string;
    remarks: string;
    inventoryCounters: InventoryCountersEntity[];
    inventoryCountingContents: InventoryCountingContents[];
    constructor(inventoryCountingEntity?: any) {
        super(inventoryCountingEntity);
    }
}


export class InventoryCountersEntity extends Entity {
    id: string;
    code: string;
    name: string;
    constructor(inventoryCountersEntity?: any) {
        super(inventoryCountersEntity);
    }
}


export class InventoryOrganizationOfCountingEntity extends Entity {
    code: string;
    name: string;

    constructor(inventoryOrganizationOfCounting?: any) {
        super(inventoryOrganizationOfCounting);
    }
}

export class EmployeeDetailOfCountingEntity extends Entity {
    code: string;
    name: string;

    constructor(employeeDetailOfCounting?: any) {
        super(employeeDetailOfCounting);
    }
}


export class InventoryCountingContents extends Entity {
    id: string;
    itemDetailId: string;
    itemDetailCode: string;
    itemDetailName: string;
    itemDetailUnitOfMeasureCode: string;
    itemDetailUnitOfMeasureName: string;
    binLocationId: string;
    binLocationCode: string;
    quantityOnDocumentDate: 0;
}

export class ItemDetailOfCountingEntity extends Entity {
    code: string;
    name: string;
}

export class UnitOfMeasureOfCountingEntity extends Entity {
    code: string;
    name: string;
    constructor(unitOfMeasureOfCountingEntity?: any) {
        super(unitOfMeasureOfCountingEntity);
    }
}

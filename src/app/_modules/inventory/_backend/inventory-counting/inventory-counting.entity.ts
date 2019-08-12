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
    inventoryCounters: InventoryCountersEntity[];
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

    constructor(inventoryCountersEntity?: any) {
        super(inventoryCountersEntity);
    }
}

export class EmployeeDetailOfCountingEntity extends Entity {
    code: string;
    name: string;
}
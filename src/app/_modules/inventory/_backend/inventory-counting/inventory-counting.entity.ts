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
    isOwner: boolean;
    enableBinLocation: boolean;
    inventoryCounters: InventoryCountersEntity[];
    inventoryCountersName: string;
    inventoryCountingContents: InventoryCountingContents[];
    inventoryCounterContents: InventoryCounterContents[];
    constructor(inventoryCountingEntity?: any) {
        super(inventoryCountingEntity);
    }
}

export class InventoryCounterContents extends Entity {
    itemDetailId: string;
    itemDetailCode: string;
    itemDetailName: string;
    itemDetailUnitOfMeasureId: string;
    itemDetailUnitOfMeasureCode: string;
    itemDetailUnitOfMeasureName: string;
    managementType: string;
    binLocationId: string;
    binLocationCode: string;
    quantity: number;

    constructor(inventoryCounterContent?: any) {
        super(inventoryCounterContent);
    }
}

export class BinLocationOfInventoryCountingEntity extends Entity {
    name: string;
    code: string;
    itemDetailName: string;
    itemDetailCode: string;
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
    enableBinLocation: boolean;
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
    itemDetailId: string;
    itemDetailCode: string;
    itemDetailName: string;
    itemDetailUnitOfMeasureId: string;
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

export class SerialNumberOfInventoryCountingEntity extends Entity {
    inventoryCounterId: string;
    itemDetailId: string;
    itemDetailName: string;
    itemDetailCode: string;
    mfrSerialNumber: string;
    serialNumber: string;
    lotNumber: string;
    quantity: number;
    expirationDate: string;
    mfrDate: string;
    admissionDate: string;
    mfrWarrantyStart: string;
    mfrWarrantyEnd: string;
    details: string;
    qrCode: string;

    constructor(serialNumberOfInventoryCountingEntity?) {
        super(serialNumberOfInventoryCountingEntity);
    }
}

export class BatchOfInventoryCountingEntity extends Entity {
    inventoryCounterId: string;
    itemDetailId: string;
    itemDetailName: string;
    itemDetailCode: string;
    mfrSerialNumber: string;
    serialNumber: string;
    lotNumber: string;
    quantity: number;
    expirationDate: string;
    mfrDate: string;
    admissionDate: string;
    mfrWarrantyStart: string;
    mfrWarrantyEnd: string;
    details: string;
    qrCode: string;

    constructor(batchOfInventoryCountingEntity?) {
        super(batchOfInventoryCountingEntity);
    }
}

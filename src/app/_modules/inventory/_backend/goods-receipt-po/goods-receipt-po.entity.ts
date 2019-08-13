import { Entities } from 'src/app/_helpers/entity';
import { Entity } from './../../../../_helpers/entity';

export class GoodsReceiptPOEntity extends Entity {

    supplierDetailId: string;
    supplierContactId: string;
    supplierCode: string;
    supplierName: string;
    supplierAddress: string;
    currencyId: string;
    currencyName: string;
    documentNumber: string;
    statusId: string;
    statusName: string;
    postingDate: string;
    dueDate: string;
    documentDate: string;
    buyerId: string;
    buyerName: string;
    ownerId: string;
    ownerName: string;
    requesterId: string;
    remarks: string;
    inventoryOrganizationId: string;
    inventoryOrganizationCode: string;
    inventoryOrganizationName: string;
    inventoryOrganizationStreet: string;
    step: number;
    generalDiscountRate: number;
    generalDiscountCost: number;
    goodsReceiptPOContents: GoodsReceiptPOContent[];
    purchaseOrderIds: PurchaseOrdersEntity[];
    purchaseOrderName: string;
    fileAttachments: FileAttachments[];
    totalGoodsReceiptPOContents: number;
    constructor(goodsReceiptPOEntity?: any) {
        super(goodsReceiptPOEntity);
    }
}

export class GoodsReceiptPOContent extends Entity {
    goodsReceiptPOId: string;
    goodsReceiptPOName: string;
    itemDetailId: string;
    itemCode: string;
    itemName: string;
    quantity: number;
    unitPrice: number;
    itemDiscountRate: number;
    itemDiscountCost: number;
    generalDiscountRate: number;
    generalDiscountCost: number;
    taxId: string;
    taxName: string;
    taxCost: number;
    unitOfMeasureId: string;
    unitOfMeasureName: string;
    unitOfMeasureCode: string;
    actualReceive: number;
    constructor(goodsReceiptPOContent?: any) {
        super(goodsReceiptPOContent);
    }
}

export class PurchaseOrdersEntity extends Entity {
    name: string;
    documentNumber: string;
    documentDate: string;
    ownerName: string;
    buyerName: string;
    isSelected: boolean;

    constructor(purchaseOrders?: any) {
        super(purchaseOrders);
    }
}

export class FileAttachments extends Entity {
    fileName: string;

    constructor(fileAttachments?: any) {
        super(fileAttachments);
    }
}

export class GoodsReceiptPORequesterEntity extends Entity {
    code: string;
    name: string;
}

export class GoodsReceiptPOInventoryOrganizationEntity extends Entity {
    code: string;
    name: string;
    shortName: string;
}

export class GoodsReceiptPOSupplierEntity extends Entity {
    code: string;
    name: string;
    taxCode: string;
    status: string;
    note: string;
}

export class GoodsReceiptPOSupplierAddressEntity extends Entity {
    name: string;
    address: string;
}

export class GoodsReceiptPOTaxEntity extends Entity {
    code: string;
    name: string;
}

export class GoodsReceiptPOUnitOfMeasureEntity extends Entity {
    name: string;
    type: string;
    description: string;
    code: string;
}

export class GoodsReceiptPOItemDetailEntity extends Entity {
    code: string;
    name: string;
}

export class GoodsReceiptPOQuantityDetail extends Entity {
    itemCode: string;
    itemName: string;
    unitOfMeasureName: string;
    quantity: number;
    actualReceive: number;
    goodsReceiptPOQuantities: GoodsReceiptPOQuantity[];
    constructor(goodsReceiptPOQuantityDetail?: any) {
        super(goodsReceiptPOQuantityDetail);
    }
}

export class GoodsReceiptPOQuantity extends Entity {
    goodsReceiptContentId: string;
    binLocationId: string;
    binLocationCode: string;
    quantity: number;

    constructor(goodsReceiptPOQuantity?) {
        super(goodsReceiptPOQuantity);
    }
}

export class GoodsReceiptPOBinlocationEntity extends Entity {
    code: string;
}

export class GoodsReceiptPOSerialNumberEntity extends Entity {
    goodsReceiptPOContentId: string;
    itemName: string;
    itemCode: string;
    mfrSerialNumber: string;
    serialNumber: string;
    lotNumber: string;
    quantity: number;
    binLocationId: string;
    binLocationCode: string;
    expirationDate: string;
    mfrDate: string;
    admissionDate: string;
    mfrWarrantyStart: string;
    mfrWarrantyEnd: string;
    location: string;
    details: string;
    qrCode: string;

    constructor(goodsReceiptPOSerialNumberEntity?) {
        super(goodsReceiptPOSerialNumberEntity);
    }
}

export class GoodsReceiptPOBatchEntity extends Entity {
    goodsReceiptPOContentId: string;
    itemName: string;
    itemCode: string;
    batchNumber: number;
    quantity: number;
    binLocationId: string;
    expirationDate: string;
    mfrDate: string;
    location: string;
    details: string;
    unitCost: number;
    goodsReceiptPOBatchBinLocations: GoodsReceiptPOBatchBinLocationEntity[];
    actualReceive: number;
    constructor(goodsReceiptPOBatchEntity?: any) {
        super(goodsReceiptPOBatchEntity);
    }
}

export class GoodsReceiptPOBatchBinLocationEntity extends Entity {
    disabled: boolean;
    goodsReceiptPOBatchId: string;
    binLocationId: string;
    binLocationCode: string;
    quantity: number;

    constructor(goodsReceiptPOBatchBinLocationEntity?: any) {
        super(goodsReceiptPOBatchBinLocationEntity);
    }
}

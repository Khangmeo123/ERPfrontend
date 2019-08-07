import { Entity } from './../../../../_helpers/entity';
import { extend } from 'webdriver-js-extender';

export class GoodsReceiptPOEntity extends Entity {

    supplierDetailId: string;
    supplierContactId: string;
    supplierContactFullName: string;
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
    generalDiscountRate: number;
    generalDiscountCost: number;
    goodsReceiptPOContents: GoodsReceiptPOContent[];
    purchaseOrders: PurchaseOrders[];
    fileAttachments: FileAttachments[];

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

    constructor(goodsReceiptPOContent?: any) {
        super(goodsReceiptPOContent);
    }
}

export class PurchaseOrders extends Entity {
    name: string;
    documentNumber: string;

    constructor(purchaseOrders?: any) {
        super(purchaseOrders);
    }
}

export class FileAttachments extends Entity {
    filename: string;

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


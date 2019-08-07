import { FormControl, FormArray } from '@angular/forms';
import { FormModel } from 'src/app/_helpers/form-model';
import { requiredField } from 'src/app/_helpers';

export class GoodsReceiptPOForm extends FormModel {
    supplierDetailId = new FormControl('', [requiredField]);
    supplierContactId = new FormControl('');
    supplierName = new FormControl('');
    supplierCode = new FormControl('');
    supplierAddress = new FormControl('');
    currencyId = new FormControl('');
    currencyName = new FormControl('');
    documentNumber = new FormControl('');
    statusId = new FormControl('');
    statusName = new FormControl('');
    postingDate = new FormControl('');
    dueDate = new FormControl('', [requiredField]);
    documentDate = new FormControl('');
    buyerId = new FormControl('');
    buyerName = new FormControl('');
    ownerId = new FormControl('', [requiredField]);
    ownerName = new FormControl('');
    requesterId = new FormControl('');
    requesterName = new FormControl('');
    remarks = new FormControl('');
    inventoryOrganizationId = new FormControl('', [requiredField]);
    inventoryOrganizationCode = new FormControl('');
    inventoryOrganizationName = new FormControl('');
    inventoryOrganizationStreet = new FormControl('');
    generalDiscountRate = new FormControl('');
    generalDiscountCost = new FormControl('');
    purchaseOrderNames = new FormControl('');
    goodsReceiptPOContents = new FormArray([]);
    purchaseOrders = new FormArray([]);
    fileAttachments = new FormArray([]);

    constructor(goodsReceiptPOEntity?: any) {
        super();
        this.mapData(goodsReceiptPOEntity);
    }
}

export class GoodsReceiptPOContentForm extends FormModel {
    goodsReceiptPOId = new FormControl('');
    goodsReceiptPOName = new FormControl('');
    itemDetailId = new FormControl('');
    itemCode = new FormControl('');
    itemName = new FormControl('');
    quantity = new FormControl('');
    unitPrice = new FormControl('');
    itemDiscountRate = new FormControl('');
    itemDiscountCost = new FormControl('');
    generalDiscountRate = new FormControl('');
    generalDiscountCost = new FormControl('');
    taxId = new FormControl('');
    taxName = new FormControl('');
    taxCost = new FormControl('');
    unitOfMeasureId = new FormControl('');
    unitOfMeasureName = new FormControl('');
    unitOfMeasureCode = new FormControl('');
}

export class PurchaseOrdersForm extends FormModel {
    name = new FormControl('');
    documentNumber = new FormControl('');

    constructor() {
        super();
    }
}

export class FileAttachmentsForm extends FormModel {
    filename = new FormControl('');

    constructor() {
        super();
    }
}
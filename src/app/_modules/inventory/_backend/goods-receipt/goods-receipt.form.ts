import { FormControl, FormArray, FormGroup } from '@angular/forms';
import { FormModel } from 'src/app/_helpers/form-model';
import { requiredField } from 'src/app/_helpers';

export class GoodsReceiptForm extends FormModel {
    supplierDetailId = new FormControl(null);
    supplierContactId = new FormControl(null);
    supplierName = new FormControl(null);
    supplierCode = new FormControl(null);
    supplierAddress = new FormControl(null);
    currencyId = new FormControl(null);
    currencyName = new FormControl(null);
    documentNumber = new FormControl(null);
    statusId = new FormControl(null);
    statusName = new FormControl(null);
    postingDate = new FormControl(null);
    dueDate = new FormControl(null, [requiredField]);
    documentDate = new FormControl(null);
    buyerId = new FormControl(null);
    buyerName = new FormControl(null);
    ownerId = new FormControl(null, [requiredField]);
    ownerName = new FormControl(null);
    requesterId = new FormControl(null);
    requesterName = new FormControl(null);
    remarks = new FormControl(null);
    step = new FormControl(null);
    enableBinLocation = new FormControl(null);
    inventoryOrganizationId = new FormControl(null, [requiredField]);
    inventoryOrganizationCode = new FormControl(null);
    inventoryOrganizationName = new FormControl(null);
    inventoryOrganizationStreet = new FormControl(null);
    generalDiscountRate = new FormControl(null);
    generalDiscountCost = new FormControl(null);
    goodsReceiptContents = new FormArray([]);
    totalGoodsReceiptContents = new FormControl(null);
    purchaseOrderIds = new FormArray([]);
    fileAttachments = new FormArray([]);
    freight = new FormControl(null);
    packageDimension = new FormControl(null);
    packageWeight = new FormControl(null);
    errors = new FormGroup({
        supplierDetailId: new FormControl(),
        dueDate: new FormControl(),
        ownerId: new FormControl(),
        inventoryOrganizationId: new FormControl(),
    });

    constructor(goodsReceiptEntity?: any) {
        super();
        this.mapData(goodsReceiptEntity);
    }
}

export class GoodsReceiptContentForm extends FormModel {
    goodsReceiptId = new FormControl(null);
    goodsReceiptName = new FormControl(null);
    itemDetailId = new FormControl(null);
    itemCode = new FormControl(null);
    itemName = new FormControl(null);
    quantity = new FormControl(null);
    unitPrice = new FormControl(null);
    itemDiscountRate = new FormControl(null);
    itemDiscountCost = new FormControl(null);
    generalDiscountRate = new FormControl(null);
    generalDiscountCost = new FormControl(null);
    total = new FormControl(null);
    taxId = new FormControl(null);
    taxName = new FormControl(null);
    taxRate = new FormControl(null);
    unitOfMeasureId = new FormControl(null);
    unitOfMeasureName = new FormControl(null);
    unitOfMeasureCode = new FormControl(null);
}

export class PurchaseOrdersOfGoodsReceiptForm extends FormModel {
    name = new FormControl(null);
    documentNumber = new FormControl(null);

    constructor() {
        super();
    }
}

export class FileAttachmentsForm extends FormModel {
    filename = new FormControl(null);

    constructor() {
        super();
    }
}

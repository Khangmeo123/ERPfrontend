import { FormModel } from 'src/app/_helpers/form-model';
import { FormControl, FormArray } from '@angular/forms';

export class GoodsIssueForm extends FormModel {
    documentDate = new FormControl(null);
    dueDate = new FormControl(null);
    employeeId = new FormControl(null);
    remarks = new FormControl(null);
    requesterId = new FormControl(null);
    statusId = new FormControl(null);
    name = new FormControl(null);
    customerDetailId = new FormControl(null);
    customerContactId = new FormControl(null);
    customerContactFullName = new FormControl(null);
    documentNumber = new FormControl(null);
    statusName = new FormControl(null);
    postingDate = new FormControl(null);
    buyerId = new FormControl(null);
    buyerName = new FormControl(null);
    ownerId = new FormControl(null);
    ownerName = new FormControl(null);
    requesterName = new FormControl(null);
    inventoryOrganizationId = new FormControl(null);
    inventoryOrganizationCode = new FormControl(null);
    inventoryOrganizationStreet = new FormControl(null);
    generalDiscountRate = new FormControl(null);
    generalDiscountCost = new FormControl(null);
    salesOrderName = new FormControl(null);
    step = new FormControl(null);
    goodsIssueContents = new FormArray([]);
    freight = new FormControl(null);
    packageDimension = new FormControl(null);
    packageWeight = new FormControl(null);

    constructor(goodsIssueEntity?: any) {
        super();
        this.mapData(goodsIssueEntity);
    }
}
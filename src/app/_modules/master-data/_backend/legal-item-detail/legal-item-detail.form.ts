import { FormControl, FormArray, FormGroup } from '@angular/forms';
import { FormModel } from 'src/app/_helpers/form-model';
import { requiredField, checkLength } from 'src/app/_helpers';
import { LegalItemDetailEntity } from './legal-item-detail.entity';

export class LegalItemDetailForm extends FormModel {
    code = new FormControl({ value: '', disabled: true });
    codeFromSupplier = new FormControl({ value: '', disabled: true });
    codeFromMarket = new FormControl({ value: '', disabled: true });
    name = new FormControl({ value: '', disabled: true });

    // characteristicEntity:
    characteristicName = new FormControl({ value: '', disabled: true });
    characteristicId = new FormControl('');

    // unitEntity:
    unitOfMeasureName = new FormControl({ value: '', disabled: true });
    unitOfMeasureId = new FormControl('');

    primaryPrice = new FormControl({ value: '', disabled: true });
    weight = new FormControl({ value: '', disabled: true });

    // statusEntity:
    statusName = new FormControl({ value: '', disabled: true });
    statusId = new FormControl('');

    height = new FormControl({ value: '', disabled: true });
    length = new FormControl({ value: '', disabled: true });
    width = new FormControl({ value: '', disabled: true });
    image = new FormControl({ value: '', disabled: true });
    description = new FormControl({ value: '', disabled: true });

    itemDetailId = new FormControl('');
    legalEntityId = new FormControl('');
    defaultValue = new FormControl('');
    itemGroupings = new FormArray([]);

    // inventory:
    inventoryAccountId = new FormControl('');
    inventoryAccountCode = new FormControl('');
    inventoryAccountName = new FormControl('');

    // returnAccount:
    returnAccountId = new FormControl('');
    returnAccountCode = new FormControl('');
    returnAccountName = new FormControl('');

    // saleAllowance:
    salesAllowancesAccountId = new FormControl('');
    salesAllowancesAccountCode = new FormControl('');
    salesAllowancesAccountName = new FormControl('');

    // expenseAccount:
    expenseAccountId = new FormControl('');
    expenseAccountCode = new FormControl('');
    expenseAccountName = new FormControl('');

    // revenueAccount:
    revenueAccountId = new FormControl('');
    revenueAccountCode = new FormControl('');
    revenueAccountName = new FormControl('');

    // discountAccount:
    discountAccountId = new FormControl('');
    discountAccountCode = new FormControl('');
    discountAccountName = new FormControl('');
    isDiscounted = new FormControl(false);
    discountTypeCode = new FormControl('');
    discountTypeName = new FormControl('');

    itemDiscounts = new FormArray([]);
    transformationUnits = new FormArray([]);
    itemMaterials = new FormArray([]);

    constructor(legalItemDetailEntity?: LegalItemDetailEntity) {
        super();
        if (legalItemDetailEntity !== null && legalItemDetailEntity !== undefined) {
            Object.keys(legalItemDetailEntity).forEach((item) => {
                if (legalItemDetailEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
                    if (legalItemDetailEntity[item] && typeof legalItemDetailEntity[item] === 'object'
                        && legalItemDetailEntity[item].constructor === Array) {
                        legalItemDetailEntity[item].forEach(r => {
                            const formGroup = new FormGroup({});
                            Object.keys(r).forEach((result) => {
                                formGroup.addControl(result, new FormControl(r[result]));
                            });
                            this[item].push(formGroup);
                        })
                    } else {
                        this[item].setValue(legalItemDetailEntity[item]);
                    }
                }
            });
        }
    }
}

export class ItemMaterialForm extends FormModel {
    sourceItemId = new FormControl('', requiredField);
    sourceItemCode = new FormControl('');
    sourceItemName = new FormControl({ value: '', disabled: true });
    unitOfMeasureId = new FormControl('', requiredField);
    unitOfMeasureCode = new FormControl('');
    unitOfMeasureName = new FormControl('');
    itemDetailId = new FormControl('');
    itemDetailCode = new FormControl('');
    itemDetailName = new FormControl('');
    quantity = new FormControl('');

    constructor(itemMaterial?: any) {
        super();
        if (itemMaterial !== null && itemMaterial !== undefined) {
            Object.keys(itemMaterial).forEach((item) => {
                if (itemMaterial.hasOwnProperty(item) && this.hasOwnProperty(item)) {
                    this[item].patchValue(itemMaterial[item]);
                }
            });
        }
    }
}

export class ItemDiscountForm extends FormModel {
    quantityFrom = new FormControl('', [requiredField]);
    quantityTo = new FormControl('', [requiredField]);
    rate = new FormControl('', [requiredField]);

    constructor(itemDiscount?: any) {
        super();
        if (itemDiscount !== null && itemDiscount !== undefined) {
            Object.keys(itemDiscount).forEach((item) => {
                if (itemDiscount.hasOwnProperty(item) && this.hasOwnProperty(item)) {
                    this[item].patchValue(itemDiscount[item]);
                }
            });
        }
    }
}

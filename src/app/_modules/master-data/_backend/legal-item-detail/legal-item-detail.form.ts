import { FormControl, FormArray } from '@angular/forms';
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
    characteristicId = new FormControl({ value: '', disabled: true });

    // unitEntity:
    uomName = new FormControl({ value: '', disabled: true });
    uomId = new FormControl({ value: '', disabled: true });

    primaryPrice = new FormControl({ value: '', disabled: true });
    weight = new FormControl({ value: '', disabled: true });

    // statusEntity:
    statusName = new FormControl({ value: '', disabled: true });
    statusId = new FormControl({ value: '', disabled: true });

    height = new FormControl({ value: '', disabled: true });
    length = new FormControl({ value: '', disabled: true });
    width = new FormControl({ value: '', disabled: true });
    img = new FormControl({ value: '', disabled: true });
    description = new FormControl({ value: '', disabled: true });

    constructor(legalItemDetailEntity?: LegalItemDetailEntity) {
        super();
        if (legalItemDetailEntity !== null && legalItemDetailEntity !== undefined) {
            Object.keys(legalItemDetailEntity).forEach((item) => {
                if (legalItemDetailEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
                    this[item].patchValue(legalItemDetailEntity[item]);
                }
            });
        }
    }
}
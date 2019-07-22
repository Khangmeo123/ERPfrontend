import { FormModel } from '../../../../_helpers/form-model';
import { FormControl, Validators, FormGroup, AbstractControl, RequiredValidator, FormArray } from '@angular/forms';
import { ValueAddedTaxEntity } from 'src/app/_modules/master-data/_backend/value-added-tax/value-added-tax.entity';
import { requiredField, checkLength } from 'src/app/_helpers';

export class ValueAddedTaxForm extends FormModel {

    taxCode = new FormControl('', [requiredField]);
    taxType = new FormControl('', [requiredField]);

    //don vi tinh
    uomId = new FormControl('');
    uomName = new FormControl('');

    //tai khoan tong hop
    coaId = new FormControl('');
    coaName = new FormControl('');



    taxRate = new FormControl('');
    description = new FormControl('');

    constructor(vatEntity?: ValueAddedTaxEntity) {
        super();
        if (vatEntity !== null && vatEntity !== undefined) {
            Object.keys(vatEntity).forEach((item) => {
                if (vatEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
                    this[item].setValue(vatEntity[item]);
                }
            });
        }
    }
}

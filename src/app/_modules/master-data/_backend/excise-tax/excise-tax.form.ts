import { FormModel } from './../../../../_helpers/form-model';
import { FormControl, Validators, FormGroup, AbstractControl, RequiredValidator, FormArray } from '@angular/forms';
import { ExciseTaxEntity } from 'src/app/_modules/master-data/_backend/excise-tax/excise-tax.entity';
import { requiredField, checkLength } from 'src/app/_helpers';

export class ExciseTaxForm extends FormModel {

    taxCode = new FormControl('', [requiredField]);
    taxType = new FormControl('', [requiredField]);

    //don vi tien te
    uomId = new FormControl('');
    uomName = new FormControl('');

    //tai khoan tong hop
    coaId = new FormControl('');
    coaName = new FormControl('');



    taxRate = new FormControl('');
    description = new FormControl('');

    constructor(exciseTariffEntity?: ExciseTaxEntity) {
        super();
        if (exciseTariffEntity !== null && exciseTariffEntity !== undefined) {
            Object.keys(exciseTariffEntity).forEach((item) => {
                if (exciseTariffEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
                    this[item].setValue(exciseTariffEntity[item]);
                }
            });
        }
    }
}

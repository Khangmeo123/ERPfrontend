import { FormModel } from '../../../../_helpers/form-model';
import { FormControl, Validators, FormGroup, AbstractControl, RequiredValidator, FormArray } from '@angular/forms';
import { EnvironmentTaxEntity } from 'src/app/_modules/master-data/_backend/environment-tax/environment-tax.entity';
import { requiredField, checkLength } from 'src/app/_helpers';

export class EnvironmentTaxForm extends FormModel {

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

    constructor(environmentTariffEntity?: EnvironmentTaxEntity) {
        super();
        if (environmentTariffEntity !== null && environmentTariffEntity !== undefined) {
            Object.keys(environmentTariffEntity).forEach((item) => {
                if (environmentTariffEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
                    this[item].setValue(environmentTariffEntity[item]);
                }
            });
        }
    }
}

import { FormModel } from './../../../../_helpers/form-model';
import { FormControl, Validators, FormGroup, AbstractControl, RequiredValidator, FormArray } from '@angular/forms';
import { SpecialConsumptionTaxEntity } from 'src/app/_modules/master-data/_backend/special-consumption-tax/special-consumption-tax.entity';
import { requiredField, checkLength } from 'src/app/_helpers';

export class SpecialConsumptionTaxForm extends FormModel {

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

    constructor(exciseTariffEntity?: SpecialConsumptionTaxEntity) {
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

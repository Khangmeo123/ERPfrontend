import { FormModel } from './../../../../_helpers/form-model';
import { FormControl, Validators, FormGroup, AbstractControl, RequiredValidator, FormArray } from '@angular/forms';
import { NaturalResourceTaxEntity } from 'src/app/_modules/master-data/_backend/natural-resource-tax/natural-resource-tax.entity';
import { requiredField, checkLength } from 'src/app/_helpers';

export class NaturalResourceTaxForm extends FormModel {

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

    constructor(resoureTariffEntity?: NaturalResourceTaxEntity) {
        super();
        if (resoureTariffEntity !== null && resoureTariffEntity !== undefined) {
            Object.keys(resoureTariffEntity).forEach((item) => {
                if (resoureTariffEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
                    this[item].setValue(resoureTariffEntity[item]);
                }
            });
        }
    }
}

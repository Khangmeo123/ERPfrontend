import { CurrencyEntity } from './currency.entity';
import { FormModel } from './../../../../_helpers/form-model';
import { FormControl, Validators, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { requiredField, checkLength } from 'src/app/_helpers';


export class CurrencyForm extends FormModel {
    name = new FormControl('', [requiredField, checkLength(3, 50)]);
    code = new FormControl('', [requiredField, checkLength(3, 10)]);
    description = new FormControl('', [checkLength(0, 500)]);
    errors = new FormGroup({
        name: new FormControl(''),
        code: new FormControl(''),
        description: new FormControl('')
    })
    constructor(currencyEntity?: CurrencyEntity) {
        super();
        if (currencyEntity !== null && currencyEntity !== undefined) {
            Object.keys(currencyEntity).forEach((item) => {
                if (currencyEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
                    this[item].patchValue(currencyEntity[item]);
                }
            });
        }
    }
}
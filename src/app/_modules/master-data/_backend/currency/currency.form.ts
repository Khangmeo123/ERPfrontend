import { CurrencyEntity } from './currency.entity';
import { FormModel } from '../../../../_helpers/form-model';
import { FormControl, Validators, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { requiredField, checkLength } from 'src/app/_helpers';


export class CurrencyForm extends FormModel {
    name = new FormControl('', [requiredField, checkLength(3, 50)]);
    code = new FormControl('', [requiredField, checkLength(3, 3)]);
    description = new FormControl('', [checkLength(0, 500)]);
    errors = new FormGroup({
        name: new FormControl(''),
        code: new FormControl(''),
        description: new FormControl(''),
    });
    constructor(currencyEntity?: CurrencyEntity) {
        super();
        this.mapData(currencyEntity);
    }
}

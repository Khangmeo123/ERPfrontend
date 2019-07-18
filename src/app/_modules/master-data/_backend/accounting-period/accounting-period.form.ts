import { FormModel } from './../../../../_helpers/form-model';
import { FormControl, Validators, FormGroup, AbstractControl, RequiredValidator, FormArray } from '@angular/forms';
import { AccountingPeriodEntity } from './accounting-period.entity';
import { requiredField, checkLength } from 'src/app/_helpers';

export class AccountingPeriodForm extends FormModel {


    formValid = new FormControl('', [requiredField]);
    toValid = new FormControl('', [requiredField]);



    description = new FormControl('');

    constructor(accountingPeriodEntity?: AccountingPeriodEntity) {
        super();
    }
}
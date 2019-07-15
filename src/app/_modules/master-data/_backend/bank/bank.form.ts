import { FormModel } from './../../../../_helpers/form-model';
import { FormControl, Validators, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { BankEntity } from 'src/app/_modules/master-data/_backend/bank/bank.entity';
import { requiredField, checkLength } from 'src/app/_helpers';


export class BankForm extends FormModel {
    name = new FormControl('', [requiredField, checkLength(3, 10)]);
    code = new FormControl('', [requiredField, checkLength(1, 500)]);
    description = new FormControl('', [checkLength(1, 1000)]);

    constructor(bankEntity?: BankEntity) {
        super(bankEntity);
    }
}
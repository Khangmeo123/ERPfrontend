import { FormModel } from './../../../../_helpers/form-model';
import { FormControl, Validators, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { BankEntity } from 'src/app/_modules/master-data/_backend/bank/bank.entity';
import { requiredField, checkLength } from 'src/app/_helpers';


export class BankForm extends FormModel {
    name = new FormControl('', [requiredField, checkLength(1, 500)]);
    code = new FormControl('', [requiredField, checkLength(3, 10)]);
    description = new FormControl('', [checkLength(0, 1000)]);
    errors = new FormGroup({
        name: new FormControl(),
        code: new FormControl()
    });
    constructor(bankEntity?: BankEntity) {
        super();
        if (bankEntity !== null && bankEntity !== undefined) {
            Object.keys(bankEntity).forEach((item) => {
                if (bankEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
                    this[item].patchValue(bankEntity[item]);
                }
            });
        }
    }
}
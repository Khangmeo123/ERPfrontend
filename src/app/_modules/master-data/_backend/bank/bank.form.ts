import { FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { BankEntity } from 'src/app/_modules/master-data/_backend/bank/bank.entity';
import { requiredField, checkLength } from 'src/app/_helpers';


export class BankForm {
    name = new FormControl('', [requiredField, checkLength(3, 10)]);
    code = new FormControl('', checkLength(1, 500));
    description = new FormControl('', checkLength(1, 1000));
    error = new FormGroup({});

    constructor(bankEntity?: BankEntity) {
        if (bankEntity !== null && bankEntity !== undefined) {
            Object.keys(bankEntity).forEach((item) => {
                if (bankEntity.hasOwnProperty(item)) {
                    this[item].setValue(bankEntity[item]);
                }
            });
            if (Object.entries(bankEntity.error).length === 0 && bankEntity.error.constructor === Object) {
                Object.keys(bankEntity.error).forEach((item) => {
                    this.error.addControl(item, new FormControl(bankEntity.error[item]));
                });
            }
        }
    }
}
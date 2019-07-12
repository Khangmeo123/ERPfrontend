import { FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { BankEntity } from 'src/app/_modules/master-data/_backend/bank/bank.entity';
import { requiredField } from 'src/app/_helpers';


export class BankForm {
    name = new FormControl();
    code = new FormControl();
    description = new FormControl();
    error = new FormGroup({});

    constructor(bankEntity?: BankEntity) {
        if (bankEntity !== null && bankEntity !== undefined) {
            if (bankEntity.name) {
                this.name.setValue(bankEntity.name);
                this.name.setValidators(requiredField);
            }
            if (bankEntity.code) {
                this.code.setValue(bankEntity.code);
                this.code.setValidators(requiredField);
            }
            if (Object.entries(bankEntity.error).length === 0 && bankEntity.error.constructor === Object) {
                Object.keys(bankEntity.error).forEach((item) => {
                    this.error.addControl(item, new FormControl(bankEntity.error[item]));
                });
            }
        }
    }
}
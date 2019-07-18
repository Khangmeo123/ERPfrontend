import { FormModel } from './../../../../_helpers/form-model';
import { FormControl, Validators, FormGroup, AbstractControl, RequiredValidator, FormArray } from '@angular/forms';
import { requiredField, checkLength } from 'src/app/_helpers';
import { PaymentTermEntity } from './payment-term.entity';

export class PaymentTermForm extends FormModel {

    name = new FormControl('', [requiredField]);
    code = new FormControl('', [requiredField]);

    dueInDate = new FormControl('');

    discountPeriod = new FormControl('');
    discountRate = new FormControl('');


    constructor(paymentTermEntity?: PaymentTermEntity) {
        super();
        if (paymentTermEntity !== null && paymentTermEntity !== undefined) {
            Object.keys(paymentTermEntity).forEach((item) => {
                if (paymentTermEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
                    this[item].setValue(paymentTermEntity[item]);
                }
            });
        }
    }
}
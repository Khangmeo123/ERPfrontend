import { FormModel } from './../../../../_helpers/form-model';
import { FormControl, Validators, FormGroup, AbstractControl, RequiredValidator, FormArray } from '@angular/forms';
import { requiredField, checkLength } from 'src/app/_helpers';
import { PaymentMethodEntity } from './payment-method.entity';

export class PaymentMethodForm extends FormModel {

    name = new FormControl('', [requiredField]);
    code = new FormControl('', [requiredField]);



    constructor(paymentMethodEntity?: PaymentMethodEntity) {
        super();
        if (paymentMethodEntity !== null && paymentMethodEntity !== undefined) {
            Object.keys(paymentMethodEntity).forEach((item) => {
                if (paymentMethodEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
                    this[item].setValue(paymentMethodEntity[item]);
                }
            });
        }
    }
}
import { FormModel } from '../../../../_helpers/form-model';
import { FormControl, FormGroup } from '@angular/forms';
import { checkLength, requiredField } from 'src/app/_helpers';
import { PaymentMethodEntity } from './payment-method.entity';

export class PaymentMethodForm extends FormModel {

  setOfBookId = new FormControl('');

  code = new FormControl('', [requiredField]);
  name = new FormControl('', [requiredField]);

  errors: FormGroup = new FormGroup({});

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

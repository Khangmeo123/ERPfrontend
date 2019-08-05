import { FormModel } from '../../../../_helpers/form-model';
import { FormControl, FormGroup } from '@angular/forms';
import { checkLength, requiredField } from 'src/app/_helpers';
import { PaymentTermEntity } from './payment-term.entity';

export class PaymentTermForm extends FormModel {

  setOfBookId = new FormControl(null, [requiredField]);

  code = new FormControl(null, [requiredField, checkLength(3, 10)]);
  name = new FormControl(null, [requiredField, checkLength(1, 100)]);

  dueInDays = new FormControl(null);

  discountPeriod = new FormControl(null);
  discountRate = new FormControl(null);

  errors: FormGroup = new FormGroup({});

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

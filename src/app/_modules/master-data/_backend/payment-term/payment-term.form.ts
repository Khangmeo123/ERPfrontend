import { FormModel } from './../../../../_helpers/form-model';
import { FormControl } from '@angular/forms';
import { requiredField } from 'src/app/_helpers';
import { PaymentTermEntity } from './payment-term.entity';

export class PaymentTermForm extends FormModel {

  setOfBookId = new FormControl('');

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

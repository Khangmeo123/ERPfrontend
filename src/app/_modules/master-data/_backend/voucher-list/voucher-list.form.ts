import { FormModel } from '../../../../_helpers/form-model';
import { FormControl, FormGroup } from '@angular/forms';
import { requiredField } from 'src/app/_helpers';
import { VoucherListEntity } from './voucher-list.entity';

export class VoucherListForm extends FormModel {

  setOfBookId = new FormControl(null, [requiredField]);

  name = new FormControl(null, [requiredField]);
  code = new FormControl(null, [requiredField]);

  errors: FormGroup = new FormGroup({});

  constructor(voucherListEntity?: VoucherListEntity) {
    super();
    if (voucherListEntity !== null && voucherListEntity !== undefined) {
      Object.keys(voucherListEntity).forEach((item) => {
        if (voucherListEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
          this[item].setValue(voucherListEntity[item]);
        }
      });
    }
  }
}

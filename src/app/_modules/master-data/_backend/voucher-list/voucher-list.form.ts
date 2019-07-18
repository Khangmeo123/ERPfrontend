import { FormModel } from './../../../../_helpers/form-model';
import { FormControl, Validators, FormGroup, AbstractControl, RequiredValidator, FormArray } from '@angular/forms';
import { requiredField, checkLength } from 'src/app/_helpers';
import { VoucherListEntity } from './voucher-list.entity';

export class VoucherListForm extends FormModel {

    name = new FormControl('', [requiredField]);
    code = new FormControl('', [requiredField]);

    debtId = new FormControl('');
    debtName = new FormControl('');

    creditId = new FormControl('');
    creditName = new FormControl('');

    typeId = new FormControl('');
    typeName = new FormControl('');

    description = new FormControl('');

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
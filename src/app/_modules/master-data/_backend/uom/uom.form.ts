import { FormModel } from './../../../../_helpers/form-model';
import { FormControl, Validators, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { requiredField, checkLength } from 'src/app/_helpers';
import { UomEntity } from './uom.entity';

export class UomForm extends FormModel {
    name = new FormControl('', [requiredField, checkLength(1, 500)]);
    code = new FormControl('', [requiredField, checkLength(3, 10)]);
    description = new FormControl('', [checkLength(0, 1000)]);

    constructor(uomEntity?: UomEntity) {
        super();
        if (uomEntity !== null && uomEntity !== undefined) {
            Object.keys(uomEntity).forEach((item) => {
                if (uomEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
                    this[item].setValue(uomEntity[item]);
                }
            });
        }
    }
}
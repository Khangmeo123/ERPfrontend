import { FormModel } from './../../../../_helpers/form-model';
import { FormControl, Validators, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { requiredField, checkLength } from 'src/app/_helpers';
import { BusinessGroupEntity } from './business-group.entity';


export class BusinessGroupForm extends FormModel {
    name = new FormControl('', [requiredField]);
    code = new FormControl('', [requiredField, checkLength(1, 2)]);
    description = new FormControl('');

    constructor(businessGroupEntity?: BusinessGroupEntity) {
        super();
        if (businessGroupEntity !== null && businessGroupEntity !== undefined) {
            Object.keys(businessGroupEntity).forEach((item) => {
                if (businessGroupEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
                    this[item].setValue(businessGroupEntity[item]);
                }
            });
        }
    }
}
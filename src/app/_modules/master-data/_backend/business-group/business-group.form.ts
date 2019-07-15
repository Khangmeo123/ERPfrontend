import { FormModel } from './../../../../_helpers/form-model';
import { FormControl, Validators, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { requiredField, checkLength } from 'src/app/_helpers';
import { BusinessGroupEntity } from './business-group.entity';


export class BusinessGroupForm extends FormModel {
    name = new FormControl('', [requiredField]);
    code = new FormControl('', [requiredField]);
    description = new FormControl('');

    constructor(businessGroupEntity?: BusinessGroupEntity) {
        super(businessGroupEntity);
    }
}
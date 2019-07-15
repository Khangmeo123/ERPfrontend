import { FormModel } from './../../../../_helpers/form-model';
import { FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { BusinessGroupEntity } from 'src/app/_modules/master-data/_backend/business-group/business-group.entity';
import { requiredField, checkLength } from 'src/app/_helpers';

export class BusinessGroupForm extends FormModel{
    code = new FormControl('',[requiredField]);
    name = new FormControl('',[requiredField]);
    description =  new FormControl('');

    constructor(businessGroupEntity?: BusinessGroupEntity) {
        super(businessGroupEntity);
    }
}
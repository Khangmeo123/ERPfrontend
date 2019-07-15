import { FormModel } from './../../../../_helpers/form-model';
<<<<<<< HEAD
import { FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { BusinessGroupEntity } from 'src/app/_modules/master-data/_backend/business-group/business-group.entity';
import { requiredField, checkLength } from 'src/app/_helpers';

export class BusinessGroupForm extends FormModel{
    code = new FormControl('',[requiredField]);
    name = new FormControl('',[requiredField]);
    description =  new FormControl('');
=======
import { FormControl, Validators, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { requiredField, checkLength } from 'src/app/_helpers';
import { BusinessGroupEntity } from './business-group.entity';


export class BusinessGroupForm extends FormModel {
    name = new FormControl('', [requiredField]);
    code = new FormControl('', [requiredField]);
    description = new FormControl('');
>>>>>>> a7f7e305f0033334e04439c91bba1e9c7f5b19c3

    constructor(businessGroupEntity?: BusinessGroupEntity) {
        super(businessGroupEntity);
    }
}
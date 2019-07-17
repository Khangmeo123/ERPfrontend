import { FormModel } from './../../../../_helpers/form-model';
import { FormControl, Validators, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { requiredField, checkLength } from 'src/app/_helpers';
import { JobTitleEntity } from './job-title.entity';


export class JobTitleForm extends FormModel {
    name = new FormControl('', [requiredField]);
    code = new FormControl('', [requiredField]);
    description = new FormControl();

    constructor(jobTitleEntity?: JobTitleEntity) {
        super();
    }
}
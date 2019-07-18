import { FormModel } from './../../../../_helpers/form-model';
import { FormControl, Validators, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { requiredField, checkLength } from 'src/app/_helpers';
import { JobLevelEntity } from './job-level.entity';


export class JobLevelForm extends FormModel {
    name = new FormControl('', [requiredField, checkLength(3, 50)]);
    code = new FormControl('', [requiredField, checkLength(3, 10)]);
    jobTitleId = new FormControl('', [requiredField]);
    jobTitleName = new FormControl('', [requiredField]);
    description = new FormControl();

    constructor(jobLevelEntity?: JobLevelEntity) {
        super();
    }
}
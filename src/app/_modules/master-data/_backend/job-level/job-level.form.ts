import { FormModel } from './../../../../_helpers/form-model';
import { FormControl, Validators, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { requiredField, checkLength } from 'src/app/_helpers';
import { JobLevelEntity } from './job-level.entity';


export class JobLevelForm extends FormModel {
    level = new FormControl('', [requiredField]);
    description = new FormControl();
    errors = new FormGroup({
        name: new FormControl(''),
        level: new FormControl(''),
    });
    constructor(jobLevelEntity?: JobLevelEntity) {
        super();
        this.mapData(jobLevelEntity);
    }
}
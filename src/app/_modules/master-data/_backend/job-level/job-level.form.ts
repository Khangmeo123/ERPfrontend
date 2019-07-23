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
        if (jobLevelEntity !== null && jobLevelEntity !== undefined) {
            Object.keys(jobLevelEntity).forEach((item) => {
                if (jobLevelEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
                    this[item].patchValue(jobLevelEntity[item]);
                }
            });
        }
    }
}
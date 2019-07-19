import { FormModel } from './../../../../_helpers/form-model';
import { FormControl, Validators, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { requiredField, checkLength } from 'src/app/_helpers';
import { JobTitleEntity } from './job-title.entity';


export class JobTitleForm extends FormModel {
    name = new FormControl('', [requiredField, checkLength(3, 50)]);
    code = new FormControl('', [requiredField, checkLength(3, 10)]);
    description = new FormControl('', [checkLength(-1, 500)]);

    constructor(jobTitleEntity?: JobTitleEntity) {
        super();
        if (jobTitleEntity !== null && jobTitleEntity !== undefined) {
            Object.keys(jobTitleEntity).forEach((item) => {
                if (jobTitleEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
                    this[item].setValue(jobTitleEntity[item]);
                }
            });
        }
    }
}
import { FormModel } from './../../../../_helpers/form-model';
import { FormControl, Validators, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { requiredField, checkLength } from 'src/app/_helpers';
import { JobTitleEntity } from './job-title.entity';


export class JobTitleForm extends FormModel {
    name = new FormControl('', [requiredField, checkLength(3, 50)]);
    code = new FormControl('', [requiredField, checkLength(3, 10)]);
    description = new FormControl('', [checkLength(0, 500)]);
    errors = new FormGroup({
        name: new FormControl(''),
        code: new FormControl(''),
        description: new FormControl('')
    });
    constructor(jobTitleEntity?: JobTitleEntity) {
        super();
        this.mapData(jobTitleEntity);
    }
}
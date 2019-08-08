import {FormModel} from './../../../../_helpers/form-model';
import {FormControl, Validators, FormGroup, AbstractControl, FormArray} from '@angular/forms';
import {requiredField, checkLength} from 'src/app/_helpers';
import {JobTitleEntity} from './job-title.entity';


export class JobTitleForm extends FormModel {
  name = new FormControl(null, [requiredField, checkLength(3, 50)]);
  code = new FormControl(null, [requiredField]);
  description = new FormControl(null, [checkLength(0, 500)]);
  errors = new FormGroup({
    name: new FormControl(null),
    code: new FormControl(null),
    description: new FormControl(null),
  });

  constructor(jobTitleEntity?: JobTitleEntity) {
    super();
    this.mapData(jobTitleEntity);
  }
}

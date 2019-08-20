import {FormModel} from '../../../../_helpers/form-model';
import {FormControl, Validators, FormGroup, AbstractControl, FormArray} from '@angular/forms';
import {requiredField, checkLength} from 'src/app/_helpers';
import {JobLevelEntity} from './job-level.entity';


export class JobLevelForm extends FormModel {
  level = new FormControl(null, [requiredField]);
  description = new FormControl();
  errors = new FormGroup({
    name: new FormControl(null),
    level: new FormControl(null),
  });

  constructor(jobLevelEntity?: JobLevelEntity) {
    super();
    this.mapData(jobLevelEntity);
  }
}

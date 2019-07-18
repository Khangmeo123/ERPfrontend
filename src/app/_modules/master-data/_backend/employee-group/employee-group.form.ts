import { FormControl, Validators, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { requiredField, checkLength } from 'src/app/_helpers';
import { EmployeeGroupEntity } from './employee-group.entity';
import { FormModel } from 'src/app/_helpers/form-model';


export class EmployeeGroupForm extends FormModel {

    name = new FormControl('', [requiredField]);
    code = new FormControl('', [requiredField]);

    description = new FormControl('');

    constructor(employeeGroupEntity?: EmployeeGroupEntity) {
        super();
    }
}
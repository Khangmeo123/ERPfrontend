import { FormControl, Validators, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { requiredField, checkLength } from 'src/app/_helpers';
import { EmployeeEntity } from './employee.entity';


export class EmployeeForm {
    name = new FormControl();
    code = new FormControl();
    identityNumber = new FormControl();
    identityDate = new FormControl();
    identityPlace = new FormControl();
    salary = new FormControl();
    salaryCoefficient = new FormControl();
    salaryInsurance = new FormControl();
    birthDay = new FormControl();
    taxNumber = new FormControl();
    dependents = new FormControl();
    gender = new FormControl();
    statusId = new FormControl();
    statusName = new FormControl();
    error = new FormGroup({});

    bankAccountEntity = new FormGroup({});
    infoContacts = new FormArray([]);

    constructor(employeeEntity?: EmployeeEntity) {
        if (employeeEntity !== null && employeeEntity !== undefined) {
            if (Object.entries(employeeEntity.error).length === 0 && employeeEntity.error.constructor === Object) {
                Object.keys(employeeEntity.error).forEach((item) => {
                    this.error.addControl(item, new FormControl(employeeEntity.error[item]));
                });
            }
        }
    }
}
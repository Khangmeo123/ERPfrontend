import { InfoContactForm } from './../info-contact/info-contact.form';
import { FormControl, Validators, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { requiredField, checkLength } from 'src/app/_helpers';
import { EmployeeEntity } from './employee.entity';
import { FormModel } from 'src/app/_helpers/form-model';


export class EmployeeForm extends FormModel {
    name = new FormControl('', [requiredField, checkLength(3, 100)]);
    code = new FormControl({ value: '', disabled: true });
    identityNumber = new FormControl();
    issueDate = new FormControl();
    issuePlace = new FormControl();
    salary = new FormControl();
    salaryRatio = new FormControl();
    insuranceSalary = new FormControl();
    dob = new FormControl();
    taxCode = new FormControl();
    numberDependentPerson = new FormControl();
    gender = new FormControl();

    // statusEntity:
    statusId = new FormControl('', [requiredField]);
    statusName = new FormControl('');

    // jobTitleEntity:
    jobTitleId = new FormControl();
    jobTitleName = new FormControl();

    // jobLevelEntity:
    jobLevelId = new FormControl();
    jobLevel = new FormControl();

    errors = new FormGroup({
        name: new FormControl(''),
        statusId: new FormControl(''),
    });

    constructor(employeeEntity?: EmployeeEntity) {
        super();
        if (employeeEntity !== null && employeeEntity !== undefined) {
            Object.keys(employeeEntity).forEach((item) => {
                if (employeeEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
                    this[item].patchValue(employeeEntity[item]);
                }
            });
        }
    }
}
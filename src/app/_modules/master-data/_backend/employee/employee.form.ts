import { InfoContactForm } from './../info-contact/info-contact.form';
import { FormControl, Validators, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { requiredField, checkLength } from 'src/app/_helpers';
import { EmployeeEntity } from './employee.entity';
import { FormModel } from 'src/app/_helpers/form-model';


export class EmployeeForm extends FormModel {
    name = new FormControl('', [requiredField, checkLength(3, 100)]);
    code = new FormControl({ value: '', disabled: true });
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

    // statusEntity:
    statusId = new FormControl('', [requiredField]);
    statusName = new FormControl('', [requiredField]);

    // jobTitleEntity:
    jobTitleId = new FormControl();
    jobTitleName = new FormControl();

    // jobLevelEntity:
    jobLevelId = new FormControl();
    jobLevelName = new FormControl();

    // bankEntity:
    bankId = new FormControl();
    bankName = new FormControl();

    bankAccountName = new FormControl();
    bankAccountNumber = new FormControl();
    bankCity = new FormControl();
    bankBranch = new FormControl();
    bankAddress = new FormControl();
    infoContacts = new FormArray([]);

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
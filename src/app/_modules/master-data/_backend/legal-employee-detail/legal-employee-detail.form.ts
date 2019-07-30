import { FormControl, FormArray, FormGroup } from '@angular/forms';
import { FormModel } from 'src/app/_helpers/form-model';
import { EmployeeDetailOfLegalEntity } from './legal-employee-detail.entity';

export class LegalEmployeeDetailForm extends FormModel {
    code = new FormControl({ value: '', disabled: true });
    name = new FormControl({ value: '', disabled: true });
    taxCode = new FormControl('');
    jobTitleId = new FormControl('');
    jobTitleName = new FormControl('');
    jobLevelId = new FormControl('');
    jobLevel = new FormControl();
    statusId = new FormControl({ value: '', disabled: true });
    statusName = new FormControl({ value: '', disabled: true }); //thiếu trường nầy này
    gender = new FormControl('');
    identityNumber = new FormControl('');
    issueDate = new FormControl('');
    issuePlace = new FormControl('');
    salary = new FormControl();
    salaryRatio = new FormControl();
    insuranceSalary = new FormControl();
    numberDependentPerson = new FormControl();
    dob = new FormControl('');
    employeeId = new FormControl(''); // trường này đôi thanh array employeeGroup
    legalEntityId = new FormControl('');
    bankAccountName = new FormControl('');
    bankAccountNumber = new FormControl('');
    bankId = new FormControl('');
    provinceId = new FormControl('');
    provinceName = new FormControl('');
    bankBranch = new FormControl('');
    bankAddress = new FormControl('');
    joinDate = new FormControl('');
    effectiveDate = new FormControl('');
    endDate = new FormControl('');

    employeeContacts = new FormArray([]);
    employeeBankAccounts = new FormArray([]);

    constructor(employeeDetailEntity?: EmployeeDetailOfLegalEntity) {
        super();
        if (employeeDetailEntity !== null && employeeDetailEntity !== undefined) {
            Object.keys(employeeDetailEntity).forEach((item) => {
                if (employeeDetailEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
                    if (employeeDetailEntity[item] && typeof employeeDetailEntity[item] === 'object'
                        && employeeDetailEntity[item].constructor === Array) {
                        employeeDetailEntity[item].forEach(r => {
                            const formGroup = new FormGroup({});
                            Object.keys(r).forEach((result) => {
                                formGroup.addControl(result, new FormControl(r[result]));
                            });
                            this[item].push(formGroup);
                        })
                    } else {
                        this[item].setValue(employeeDetailEntity[item]);
                    }
                }
            });
        }
    }
}
import { FormControl, FormArray, FormGroup } from '@angular/forms';
import { FormModel } from 'src/app/_helpers/form-model';
import { DepartmentEmployeeDetailEntity } from './department-employee-detail.entity';

export class DepartmentEmployeeDetailForm extends FormModel {
    code = new FormControl({ value: '', disabled: true });
    name = new FormControl({ value: '', disabled: true });
    taxCode = new FormControl({ value: '', disabled: true });
    jobTitleId = new FormControl({ value: '', disabled: true });
    jobTitleName = new FormControl({ value: '', disabled: true });
    jobLevelId = new FormControl({ value: '', disabled: true });
    jobLevel = new FormControl({ value: '', disabled: true });
    statusId = new FormControl({ value: '', disabled: true });
    statusDisplay = new FormControl({ value: '', disabled: true });
    gender = new FormControl({ value: false, disabled: true });
    identityNumber = new FormControl({ value: '', disabled: true });
    issueDate = new FormControl({ value: '', disabled: true });
    issuePlace = new FormControl({ value: '', disabled: true });
    salary = new FormControl({ value: '', disabled: true });
    salaryRatio = new FormControl({ value: '', disabled: true });
    insuranceSalary = new FormControl({ value: '', disabled: true });
    numberDependentPerson = new FormControl({ value: '', disabled: true });
    dob = new FormControl({ value: '', disabled: true });
    employeeId = new FormControl('');
    legalEntityId = new FormControl('');
    bankAccountName = new FormControl('');
    bankAccountNumber = new FormControl('');
    bankId = new FormControl('');
    bankName = new FormControl('');
    provinceId = new FormControl('');
    provinceName = new FormControl('');
    bankBranch = new FormControl('');
    bankAddress = new FormControl('');
    joinDate = new FormControl('');
    effectiveDate = new FormControl('');
    endDate = new FormControl('');

    employeeContacts = new FormArray([]);
    employeePositions = new FormArray([]);

    constructor(departmentEmployeeDetailEntity?: DepartmentEmployeeDetailEntity) {
        super();
        if (departmentEmployeeDetailEntity !== null && departmentEmployeeDetailEntity !== undefined) {
            Object.keys(departmentEmployeeDetailEntity).forEach((item) => {
                if (departmentEmployeeDetailEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
                    if (departmentEmployeeDetailEntity[item] && typeof departmentEmployeeDetailEntity[item] === 'object'
                        && departmentEmployeeDetailEntity[item].constructor === Array) {
                        departmentEmployeeDetailEntity[item].forEach(r => {
                            const formGroup = new FormGroup({});
                            Object.keys(r).forEach((result) => {
                                formGroup.addControl(result, new FormControl(r[result]));
                            });
                            this[item].push(formGroup);
                        })
                    } else {
                        this[item].setValue(departmentEmployeeDetailEntity[item]);
                    }
                }
            });
        }
    }
}

import { Entity } from 'src/app/_helpers/entity';
import { InfoContactEntity } from '../info-contact/info-contact.entity';

export class EmployeeDetailOfLegalEntity extends Entity {
    disabled: boolean;
    code: string;
    name: string;
    jobTitleId: string;
    jobTitleName: string;
    jobLevelId: string;
    jobLevel: 0;
    statusId: string;
    gender: boolean;
    identityNumber: string;
    issueDate: string;
    issuePlace: string;
    taxCode: string;
    salary: 0;
    salaryRatio: 0;
    insuranceSalary: 0;
    numberDependentPerson: 0;
    dob: string;
    employeeId: string;
    legalEntityId: string;
    bankAccountName: string;
    bankAccountNumber: string;
    bankId: string;
    provinceId: string;
    provinceName: string;
    bankBranch: string;
    bankAddress: string;
    joinDate: string;
    effectiveDate: string;
    endDate: string;

    customerContacts: InfoContactEntity[];

    constructor(employeeEntity?: any) {
        super(employeeEntity);
    }
}

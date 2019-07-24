import { Entity } from 'src/app/_helpers/entity';
import { InfoContactEntity } from '../info-contact/info-contact.entity';
import { BankAccountEntity } from '../bank-account/bank-account.entity';

export class EmployeeEntity extends Entity {
    code: string;
    name: string;
    identityNumber: string;
    issueDate: string;
    issuePlace: string;
    salary: number;
    salaryRatio: number;
    insuranceSalary: number;
    dob: string;
    taxCode: string;
    numberDependentPerson: number;
    gender: boolean;

    // statusEntity:
    statusId: string;
    statusName: string;

    // jobTitleEntity:
    jobTitleId: string;
    jobTitleName: string;

    // jobLevelEntity:
    jobLevelId: string;
    jobLevelName: string;

    constructor(employeeEntity?: any) {
        super(employeeEntity);
    }
}
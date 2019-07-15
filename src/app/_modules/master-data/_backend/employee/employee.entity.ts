import { Entity } from 'src/app/_helpers/entity';
import { InfoContactEntity } from '../info-contact/info-contact.entity';
import { BankAccountEntity } from '../bank-account/bank-account.entity';

export class EmployeeEntity extends Entity {
    code: string;
    name: string;
    identityNumber: string;
    identityDate: string;
    identityPlace: string;
    salary: number;
    salaryCoefficient: number;
    salaryInsurance: number;
    birthDay: string;
    taxNumber: string;
    dependents: number;
    gender: boolean;

    // statusEntity:
    statusId: string;
    statusName: string;
    statusCode: string;

    // jobTitleEntity:
    jobTitleId: string;
    jobTitleName: string;
    jobTitleCode: string;

    // jobLevelEntity:
    jobLevelId: string;
    jobLevelName: string;
    jobLevelCode: string;

    // bankEntity:
    bankId: string;
    bankName: string;
    bankCode: string;

    bankAccountName: string;
    bankAccountNumber: string;
    bankCity: string;
    bankBranch: string;
    bankAddress: string;

    infoContacts: InfoContactEntity[];

    constructor(employeeEntity?: any) {
        super(employeeEntity);
    }
}
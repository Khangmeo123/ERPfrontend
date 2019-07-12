import { SearchEntity } from 'src/app/_helpers/search-entity';

export class EmployeeSearchEntity extends SearchEntity {
    code: string;
    name: string;
    gender: boolean;
    birthday: string;
    identityNumber: string;
    bankAccountId: string;
    statusId: string;

    constructor(employeeSearchEntity: any) {
        super(employeeSearchEntity);
    }
}
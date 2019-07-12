import { SearchEntity } from 'src/app/_helpers/search-entity';

export class EmployeeSearchEntity extends SearchEntity {
    code: string;
    name: string;
    address: string;
    taxNumber: string;
    phone: number;
    statusId: string;

    constructor(employeeSearchEntity: any) {
        super(employeeSearchEntity);
    }
}
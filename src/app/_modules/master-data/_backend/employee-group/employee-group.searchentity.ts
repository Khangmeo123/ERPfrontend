import { SearchEntity } from 'src/app/_helpers/search-entity';

export class EmployeeGroupSearchEntity extends SearchEntity {
    sobId: string;
   legalId:string;


    code:string;
    name:string;
    description:string;

    
    constructor(employeeGroupSearchEntity: any) {
        super(employeeGroupSearchEntity);
    }
}
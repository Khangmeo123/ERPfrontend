import { Entity } from 'src/app/_helpers/entity';

export class EmployeeGroupEntity extends Entity {
    // sobEntity:
    sobId: string;
    legalId:string;

    code: string;
    name:string;
    
    description:string;
    
    constructor(employeeGroupEntity: any) {
        super(employeeGroupEntity);
    }
}
import { Entity } from 'src/app/_helpers/entity';

export class EmployeePositionEntity extends Entity {
    // sobEntity:
    sobId: string;
    legalEntityId:string;

    code: string;
    name:string;

    description:string;

    constructor(employeePositionEntity?: any) {
        super(employeePositionEntity);
    }
}

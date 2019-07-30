import { Entity } from 'src/app/_helpers/entity';

export class DivisionEntity extends Entity {
    name: string;
    code: string;
    address: string;


    constructor(divisionEntity?: any) {
        super(divisionEntity);
    }
}
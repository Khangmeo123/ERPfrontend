import { Entity } from 'src/app/_helpers/entity';

export class CustomerGroupEntity extends Entity {
    // sobEntity:
    sobId: string;

    code: string;
    name:string;

    description:string;
    

    constructor(customerGroupEntity: any) {
        super(customerGroupEntity);
    }
}
import { Entity } from 'src/app/_helpers/entity';

export class BusinessGroupEntity extends Entity {
<<<<<<< HEAD

    code: String;
    name: String;
    description: string;

    constructor(businessGroupEntity?: any){
        super(businessGroupEntity);
    }

=======
    name: string;
    code: string;
    description: string;

    constructor(businessGroupEntity?: any) {
        super(businessGroupEntity);
    }
>>>>>>> a7f7e305f0033334e04439c91bba1e9c7f5b19c3
}
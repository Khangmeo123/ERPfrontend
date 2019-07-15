import { Entity } from 'src/app/_helpers/entity';

export class BusinessGroupEntity extends Entity {

    code: String;
    name: String;
    description: string;

    constructor(businessGroupEntity?: any){
        super(businessGroupEntity);
    }

}
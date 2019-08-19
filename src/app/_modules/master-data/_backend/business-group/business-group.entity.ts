import { Entity } from 'src/app/_helpers/entity';

export class BusinessGroupEntity extends Entity {
    name: string;
    code: string;
    description: string;
    constructor(businessGroupEntity?: any) {
        super(businessGroupEntity);
    }
}

import { Entity } from 'src/app/_helpers/entity';

export class UomEntity extends Entity {
    code: string;
    name: string;
    description: string;

    constructor(uomEntity?: any) {
        super(uomEntity);
    }
}

import { Entity } from 'src/app/_helpers/entity';

export class UnitEntity extends Entity {
    code: string;
    name: string;
    description: string;

    constructor(unitEntity: any) {
        super(unitEntity);
    }
}
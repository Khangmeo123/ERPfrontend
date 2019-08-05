import { Entity } from 'src/app/_helpers/entity';

export class ItemGroupEntity extends Entity {
    // sobEntity:
    sobId: string;
    legalId: string;

    code: string;
    name: string;

    description: string;

    constructor(itemGroupEntity: any) {
        super(itemGroupEntity);
    }
}
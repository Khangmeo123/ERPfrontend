import { Entity } from 'src/app/_helpers/entity';

export class SobEntity extends Entity {
    code: string;
    name: string;

    // currencyEntity:
    currencyId: string;
    currencyCode: string;
    currencyName: string;

    constructor(sobEntity: any) {
        super(sobEntity);
    }
}
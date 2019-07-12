import { Entity } from 'src/app/_helpers/entity';

export class CurrencyEntity extends Entity {
    code: string;
    name: string;
    description: string;

    constructor(currencyEntity: any) {
        super(currencyEntity);
    }
}
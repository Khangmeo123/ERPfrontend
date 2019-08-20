import { Entity } from 'src/app/_helpers/entity';

export class BankEntity extends Entity {
    name: string;
    code: string;
    description: string;

    constructor(bankEntity?: any) {
        super(bankEntity);
    }
}

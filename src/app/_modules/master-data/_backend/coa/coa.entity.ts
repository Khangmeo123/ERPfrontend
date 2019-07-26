import { Entity } from 'src/app/_helpers/entity';

export class CoaEntity extends Entity {
    // sobEntity:
    setOfBookId: string;

    accountNumber: string;
    accountName: string;

    characteristicId: string;
    characteristicName: string;

    parentAccountId: string;
    parentAccountNumber: string;

    description: string;

    constructor(coaEntity?: any) {
        super(coaEntity);
    }
}

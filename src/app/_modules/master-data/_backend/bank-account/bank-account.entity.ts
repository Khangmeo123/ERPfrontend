import { Entity } from 'src/app/_helpers/entity';

export class BankAccountEntity extends Entity {
    storyBookId: string;

    // coaEntity:
    coaId: string;
    coaName: string;
    coaCode: string;

    // bankEntity:
    bankId: string;
    bankCode: string;
    bankName: string;

    accountNumber: string;
    accountName: string;
    description: string;

    constructor(bankAccountEntity: any) {
        super(bankAccountEntity);
    }
}
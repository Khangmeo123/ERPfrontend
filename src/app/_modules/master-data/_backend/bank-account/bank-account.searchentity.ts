import { SearchEntity } from 'src/app/_helpers/search-entity';

export class BankAccountSearchEntity extends SearchEntity {
    coaId: string;
    bankName: string;
    bankCode: string;
    accountName: string;
    accountNumber: string;
    description: string;

    constructor(bankAccountSearchEntity: any) {
        super(bankAccountSearchEntity);
    }
}
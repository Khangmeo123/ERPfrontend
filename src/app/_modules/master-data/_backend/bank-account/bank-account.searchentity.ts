import { SearchEntity } from 'src/app/_helpers/search-entity';

export class BankAccountSearchEntity extends SearchEntity {
    sobId: string;
    coaId: string;
    bankId: string;
    bankName: string;
    bankCode: string;
    accountName: string;
    accountNumber: string;
    description: string;
    branch: string;
    provinceId: string;
    provinceName: string;
    address: string;
    

    constructor(bankAccountSearchEntity?: any) {
        super(bankAccountSearchEntity);
    }
}
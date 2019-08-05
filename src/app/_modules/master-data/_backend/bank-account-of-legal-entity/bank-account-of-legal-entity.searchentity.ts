import { SearchEntity } from 'src/app/_helpers/search-entity';

export class BankAccountOfLegalSearchEntity extends SearchEntity {

    id: string;
    name: string;
    bankId: string;
    bankName: string;
    accountNumber: string;
    accountName: string;
    branch: string;
    provinceId: string;
    provinceName: string;
    address: string;
    constructor(bankAccountOfLegalSearchEntity?: any) {
        super(bankAccountOfLegalSearchEntity);
    }
}
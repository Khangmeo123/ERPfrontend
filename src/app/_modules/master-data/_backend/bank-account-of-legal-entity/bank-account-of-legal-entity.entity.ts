
import { Entity } from 'src/app/_helpers/entity';

export class BankAccountOfLegalEntity extends Entity {

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
    constructor(bankAccountOfLegalEntity?: any) {
        super(bankAccountOfLegalEntity);
    }
}

import { Entity } from 'src/app/_helpers/entity';
import { InfoContactEntity } from '../info-contact/info-contact.entity';
import { BankAccountEntity } from '../bank-account/bank-account.entity';

export class SupplierDetailEntity extends Entity {
    code: string;
    name: string;
    taxNumber: string;
    note: string;
    statusId: string;
    statusName: string;
    statusCode: string;

    infoContacts: InfoContactEntity[];
    bankAccounts: BankAccountEntity[];

    constructor(supplierDetailEntity?: any) {
        super(supplierDetailEntity);
    }
}
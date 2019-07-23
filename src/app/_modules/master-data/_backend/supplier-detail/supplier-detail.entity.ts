import { Entity } from 'src/app/_helpers/entity';
import { InfoContactEntity } from '../info-contact/info-contact.entity';
import { BankAccountEntity } from '../bank-account/bank-account.entity';

export class SupplierEntity extends Entity {
    code: string;
    name: string;
    taxNumber: string;
    note: string;
    // statusEntity
    statusId: string;
    statusName: string;
    statusCode: string;

    infoContacts: InfoContactEntity[];
    bankAccounts: BankAccountEntity[];

    constructor(supplierEntity?: any) {
        super(supplierEntity);
    }
}
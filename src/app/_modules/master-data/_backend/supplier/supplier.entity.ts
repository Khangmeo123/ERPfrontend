import { Entity } from 'src/app/_helpers/entity';
import { InfoContactEntity } from '../info-contact/info-contact.entity';
import { BankAccountEntity } from '../bank-account/bank-account.entity';

export class SupplierEntity extends Entity {
    code: string;
    name: string;
    taxNumber: string;
    note: string;
    legalEntityId: string;
    supplierIds: []

    // status
    statusId: string;
    statusName: string;

    constructor(supplierEntity?: any) {
        super(supplierEntity);
    }
}
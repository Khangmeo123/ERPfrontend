import { Entity } from 'src/app/_helpers/entity';
import { InfoContactEntity } from '../info-contact/info-contact.entity';
import { BankAccountOfLegalForm } from '../bank-account-of-legal-entity/bank-account-of-legal-entity.form';

export class LegalSupplierDetailEntity extends Entity {
    id: string;
    code: string;
    name: string;
    taxCode: string;
    status: string;
    note: string;
    paymentTermId: string;
    paymentTermName: string;
    dueInDays: 0;
    debtLoad: 0;
    staffInChargeId: string;
    staffInChargeName: string;
    businessGroupId: string;

    supplierContacts: InfoContactEntity[];
    supplierBankAccounts: BankAccountOfLegalForm[];
    supplierGroupings: string[];

    constructor(supplierEntity?: any) {
        super(supplierEntity);
    }
}
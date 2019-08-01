import { Entity } from 'src/app/_helpers/entity';
import { InfoContactEntity } from '../info-contact/info-contact.entity';
import { BankAccountEntity } from '../bank-account/bank-account.entity';

export class CustomerDetailOfLegalEntity extends Entity {
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

    customerContacts: InfoContactEntity[];
    customerBankAccounts: BankAccountEntity[];
    customerGroups: string[]

    constructor(customerEntity?: any) {
        super(customerEntity);
    }
}
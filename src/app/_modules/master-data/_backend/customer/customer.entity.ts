import { Entity } from 'src/app/_helpers/entity';
import { InfoContactEntity } from '../info-contact/info-contact.entity';
import { BankAccountEntity } from '../bank-account/bank-account.entity';

export class CustomerEntity extends Entity {
    code: string;
    name: string;
    taxCode: string;
    note: string;

    // statusEntity
    statusId: string;
    statusName: string;


    constructor(customerEntity?: any) {
        super(customerEntity);
    }
}
import { Entity } from 'src/app/_helpers/entity';
import { InfoContactEntity } from '../info-contact/info-contact.entity';
import { BankAccountEntity } from '../bank-account/bank-account.entity';

export class SupplierEntity extends Entity {
    code: string;
    name: string;
    identityNumber: string;
    identityDate: string;
    identityPlace: string;
    birthDay: string;
    taxNumber: string;
    dependents: number;
    gender: boolean;
    address: string;
    // statusEntity
    statusId: string;
    statusName: string;
    statusCode: string;

    bankAccountEntity: BankAccountEntity;
    infoContacts: InfoContactEntity[];

    constructor(supplierEntity: any) {
        super(supplierEntity);
    }
}
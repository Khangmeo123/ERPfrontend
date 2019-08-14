import { Entity } from 'src/app/_helpers/entity';

export class SupplierEntity extends Entity {
    code: string;
    name: string;
    taxCode: string;
    note: string;
    legalEntityId: string;
    supplierIds: []

    // status
    statusId: string;
    statusDisplay: string;

    constructor(supplierEntity?: any) {
        super(supplierEntity);
    }
}

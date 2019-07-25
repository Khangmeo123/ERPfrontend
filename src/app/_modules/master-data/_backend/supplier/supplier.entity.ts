import { Entity } from 'src/app/_helpers/entity';

export class SupplierEntity extends Entity {
    code: string;
    name: string;
    taxCode: string;
    note: string;

    // status
    statusId: string;
    statusName: string;

    constructor(supplierEntity?: any) {
        super(supplierEntity);
    }
}
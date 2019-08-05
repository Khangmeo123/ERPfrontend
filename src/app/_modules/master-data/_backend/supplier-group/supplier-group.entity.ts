import { Entity } from 'src/app/_helpers/entity';

export class SupplierGroupEntity extends Entity {
    legalEntityId: string;
    code: string;
    name: string;
    constructor(supplierGroupEntity?: any) {
        super(supplierGroupEntity);
    }
}
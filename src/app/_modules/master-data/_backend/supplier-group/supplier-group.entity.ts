import { Entity } from 'src/app/_helpers/entity';

export class SupplierGroupEntity extends Entity {
    // sobEntity:
    sobId: string;
    legalId:string;

    code: string;
    name:string;
    
    description:string;
    
    constructor(supplierGroupEntity: any) {
        super(supplierGroupEntity);
    }
}
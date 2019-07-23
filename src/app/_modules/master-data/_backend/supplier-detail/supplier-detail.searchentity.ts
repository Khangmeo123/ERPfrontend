import { SearchEntity } from 'src/app/_helpers/search-entity';

export class SupplierDetailSearchEntity extends SearchEntity {
    code: string;
    name: string;
    address: string;
    taxNumber: string;
    phone: string;
    statusId: string;

    constructor(supplierDetailSearchEntity?: any) {
        super(supplierDetailSearchEntity);
    }
}
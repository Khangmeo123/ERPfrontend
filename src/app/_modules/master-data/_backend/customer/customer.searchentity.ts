import { SearchEntity } from 'src/app/_helpers/search-entity';

export class CustomerSearchEntity extends SearchEntity {
    code: string;
    name: string;
    address: string;
    taxNumber: string;
    phone: number;
    statusId: string;

    constructor(customerSearchEntity?: any) {
        super(customerSearchEntity);
    }
}
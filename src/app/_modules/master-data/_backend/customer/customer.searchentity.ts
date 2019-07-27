import { SearchEntity } from 'src/app/_helpers/search-entity';
import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';

export class CustomerSearchEntity extends SearchEntity {
    code: string;
    name: string;
    address: string;
    taxNumber: string;
    phone: number;
    statusId: string;

    legalEntityId: string;
    customerIds: Array<any>;

    constructor(customerSearchEntity?: any) {
        super(customerSearchEntity);
    }
}
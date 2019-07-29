import { SearchEntity } from 'src/app/_helpers/search-entity';
import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';

export class CustomerSearchEntity extends SearchEntity {
    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();
    address: string;
    taxNumber: string;
    phone: number;
    statusId: string;

    legalEntityId: string;
    customerGroupingId: string;
    customerDetailIds: Array<any>;

    constructor(customerSearchEntity?: any) {
        super(customerSearchEntity);
    }
}
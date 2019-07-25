import { SearchEntity } from 'src/app/_helpers/search-entity';
import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';

export class CustomerSearchEntity extends SearchEntity {
    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();
    taxCode: TextFilter = new TextFilter();
    statusId: string = '';

    constructor(customerSearchEntity?: any) {
        super(customerSearchEntity);
    }
}

import { SearchEntity } from 'src/app/_helpers/search-entity';
import { TextFilter } from '../../../../_shared/models/filters/TextFilter';

export class CoaSearchEntity extends SearchEntity {
    sobId: TextFilter = new TextFilter();
    accountNumber: TextFilter = new TextFilter();
    accountName: TextFilter = new TextFilter();
    propertyId: TextFilter = new TextFilter();
    description: TextFilter = new TextFilter();

    constructor(coaSearchEntity?: any) {
        super(coaSearchEntity);
    }
}

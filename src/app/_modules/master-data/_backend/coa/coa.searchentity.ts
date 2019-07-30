import { TextFilter } from './../../../../_shared/models/filters/TextFilter';
import { SearchEntity } from 'src/app/_helpers/search-entity';

export class CoaSearchEntity extends SearchEntity {
    sobId: string;
    accountCode: TextFilter = new TextFilter();
    accountName: TextFilter = new TextFilter();
    propertyId: string;
    description: TextFilter = new TextFilter();

    constructor(coaSearchEntity?: any) {
        super(coaSearchEntity);
    }
}
import { SearchEntity } from 'src/app/_helpers/search-entity';
import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';

export class SupplierGroupSearchEntity extends SearchEntity {
    legalEntityId: string;
    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();

    
    constructor(supplierGroupSearchEntity?: any) {
        super(supplierGroupSearchEntity);
    }
}
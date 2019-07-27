import { SearchEntity } from 'src/app/_helpers/search-entity';
import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';

export class SupplierSearchEntity extends SearchEntity {
    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();
    taxNumber: TextFilter = new TextFilter();
    statusId: string;
    legalEntityId: TextFilter = new TextFilter();
    supplierGroupingId: TextFilter = new TextFilter();
    supplierIds: Array<any>;


    constructor(employeeSearchEntity?: any) {
        super(employeeSearchEntity);
    }
}

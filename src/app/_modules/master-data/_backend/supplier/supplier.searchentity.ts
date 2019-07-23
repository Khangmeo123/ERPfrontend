import { SearchEntity } from 'src/app/_helpers/search-entity';
import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';

export class SupplierSearchEntity extends SearchEntity {
    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();
    taxNumber: TextFilter = new TextFilter();
    statusId: string;

    constructor(employeeSearchEntity?: any) {
        super(employeeSearchEntity);
    }
}

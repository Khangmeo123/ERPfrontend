import { SearchEntity } from 'src/app/_helpers/search-entity';
import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';

export class EmployeeSearchEntity extends SearchEntity {
    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();
    gender: TextFilter = new TextFilter();
    birthday: TextFilter = new TextFilter();
    identityNumber: TextFilter = new TextFilter();
    statusId: TextFilter = new TextFilter();

    constructor(employeeSearchEntity?: any) {
        super(employeeSearchEntity);
    }
}
import { SearchEntity } from 'src/app/_helpers/search-entity';
import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';
import { DateFilter } from 'src/app/_shared/models/filters/DateFilter';

export class EmployeeSearchEntity extends SearchEntity {
    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();
    gender: boolean = null;
    dob: DateFilter = new DateFilter();
    identityNumber: TextFilter = new TextFilter();
    statusId: string = '';

    constructor(employeeSearchEntity?: any) {
        super(employeeSearchEntity);
    }
}
import { SearchEntity } from 'src/app/_helpers/search-entity';
import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';

export class EmployeePositionSearchEntity extends SearchEntity {
    sobId: string;
    legalEntityId:string;

    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();


    constructor(employeePositionSearchEntity?: any) {
        super(employeePositionSearchEntity);
    }
}

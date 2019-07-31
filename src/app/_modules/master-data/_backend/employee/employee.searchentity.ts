import { SearchEntity } from 'src/app/_helpers/search-entity';
import { TextFilter } from '../../../../_shared/models/filters/TextFilter';

export class EmployeeSearchEntity extends SearchEntity {
  code: TextFilter = new TextFilter();

  name: TextFilter = new TextFilter();

  departmentId: string;

  constructor(employeeSearchEntity?: any) {
    super(employeeSearchEntity);
  }
}

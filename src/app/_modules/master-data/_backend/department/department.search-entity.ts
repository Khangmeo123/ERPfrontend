import { SearchEntity } from '../../../../_helpers/search-entity';
import { TextFilter } from '../../../../_shared/models/filters/TextFilter';

export class DepartmentSearchEntity extends SearchEntity {
  legalEntityId: string;

  code: TextFilter = new TextFilter();

  name: TextFilter = new TextFilter();

  constructor(departmentSearchEntity?: any) {
    super(departmentSearchEntity);
  }
}

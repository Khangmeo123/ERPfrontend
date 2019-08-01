import { SearchEntity } from '../../../../_helpers/search-entity';
import { TextFilter } from '../../../../_shared/models/filters/TextFilter';
import { DateFilter } from '../../../../_shared/models/filters/DateFilter';

export class ProjectOrganizationSearchEntity extends SearchEntity {
  legalEntityId: string;

  divisionId: string;

  code: TextFilter = new TextFilter();

  name: TextFilter = new TextFilter();

  managerName: TextFilter = new TextFilter();

  startDate: DateFilter = new DateFilter();

  endDate: DateFilter = new DateFilter();

  constructor(departmentSearchEntity?: any) {
    super(departmentSearchEntity);
  }
}

import { SearchEntity } from '../../../../_helpers/search-entity';
import { TextFilter } from '../../../../_shared/models/filters/TextFilter';

export class CodeFormulaSearchEntity extends SearchEntity {
  id: string;

  code: TextFilter = new TextFilter();

  name: TextFilter = new TextFilter();

  description: TextFilter = new TextFilter();

  constructor(searchEntity?: CodeFormulaSearchEntity) {
    super(searchEntity);
  }
}

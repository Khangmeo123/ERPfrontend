import { SearchEntity } from '../../../../_helpers/search-entity';
import { TextFilter } from '../../../../_shared/models/filters/TextFilter';

export class BinLocationSearchEntity extends SearchEntity {
  id: string;

  code: TextFilter = new TextFilter();

  name: TextFilter = new TextFilter();

  constructor(searchEntity?: BinLocationSearchEntity) {
    super(searchEntity);
  }
}

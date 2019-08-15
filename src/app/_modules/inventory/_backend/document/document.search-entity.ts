import {SearchEntity} from '../../../../_helpers/search-entity';
import {TextFilter} from '../../../../_shared/models/filters/TextFilter';

export class DocumentSearchEntity extends SearchEntity {
  code: TextFilter = new TextFilter();

  name: TextFilter = new TextFilter();

  constructor(documentSearchEntity?: DocumentSearchEntity) {
    super(documentSearchEntity);
  }
}

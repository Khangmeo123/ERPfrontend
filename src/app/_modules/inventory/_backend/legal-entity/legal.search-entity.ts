import {SearchEntity} from '../../../../_helpers/search-entity';
import {TextFilter} from '../../../../_shared/models/filters/TextFilter';

export class LegalSearchEntity extends SearchEntity {
  code: TextFilter = new TextFilter();

  name: TextFilter = new TextFilter();

  constructor(legalSearchEntity?: LegalSearchEntity) {
    super(legalSearchEntity);
  }
}

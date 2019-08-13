import {SearchEntity} from '../../../../_helpers/search-entity';
import {TextFilter} from '../../../../_shared/models/filters/TextFilter';

export class TaxTemplateSearchEntity extends SearchEntity {

  typeId: string;

  typeDisplay: string;

  code: TextFilter = new TextFilter();

  name: TextFilter = new TextFilter();

  constructor(taxTemplateSearchEntity?: TaxTemplateSearchEntity) {
    super(taxTemplateSearchEntity);
  }
}

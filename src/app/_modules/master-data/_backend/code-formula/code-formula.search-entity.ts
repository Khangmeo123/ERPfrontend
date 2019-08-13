import {SearchEntity} from '../../../../_helpers/search-entity';
import {TextFilter} from '../../../../_shared/models/filters/TextFilter';
import {NumberFilter} from '../../../../_shared/models/filters/NumberFilter';
import {Entity} from '../../../../_helpers/entity';

export class CodeFormulaSearchEntity extends SearchEntity {
  id: string;

  legalEntityId: string;

  code: TextFilter = new TextFilter();

  length: NumberFilter = new NumberFilter();

  identifierStringStart: NumberFilter = new NumberFilter();

  identifierStringEnd: NumberFilter = new NumberFilter();

  identifierStringValues: TextFilter = new TextFilter();

  constructor(searchEntity?: CodeFormulaSearchEntity) {
    super(searchEntity);
  }
}

export class SplitRuleContentSearchEntity extends Entity {
  fieldId: string;

  fieldDisplay: TextFilter = new TextFilter();

  start: NumberFilter = new NumberFilter();

  end: NumberFilter = new NumberFilter();

  constructor(searchEntity?: CodeFormulaSearchEntity) {
    super(searchEntity);
  }
}

import {SearchEntity} from '../../../../_helpers/search-entity';
import {TextFilter} from '../../../../_shared/models/filters/TextFilter';

export class InventoryOrganizationSearchEntity extends SearchEntity {

  code: TextFilter = new TextFilter();

  name: TextFilter = new TextFilter();

  constructor(inventoryOrganizationSearchEntity?: InventoryOrganizationSearchEntity) {
    super(inventoryOrganizationSearchEntity);
  }
}

import {Entity} from '../../../../_helpers/entity';

export class InventoryOrganizationEntity extends Entity {
  id: string;

  code: string;

  name: string;

  constructor(inventoryOrganizationEntity?: InventoryOrganizationEntity) {
    super(inventoryOrganizationEntity);
  }
}

import { Entity } from '../../../../_helpers/entity';

export class CharacteristicEntity extends Entity {
  id: string;
  name: string;

  constructor(characteristicEntity?: CharacteristicEntity) {
    super(characteristicEntity);
  }
}

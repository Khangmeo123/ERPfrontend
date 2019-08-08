import { Entity } from '../../../../_helpers/entity';

export class BinLocationEntity extends Entity {
  id: string;

  code: string;
  name: string;

  constructor(entity?: BinLocationEntity) {
    super(entity);
  }
}

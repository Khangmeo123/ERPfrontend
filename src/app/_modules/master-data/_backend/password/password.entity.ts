import { Entity } from '../../../../_helpers/entity';

export class PasswordEntity extends Entity {
  id: string;

  password: string;

  constructor(entity?: PasswordEntity) {
    super(entity);
  }
}

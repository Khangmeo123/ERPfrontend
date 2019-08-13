import { Entity } from '../../_helpers/entity';

export class UserEntity extends Entity {
  username: string;

  password: string;

  constructor(userEntity?: UserEntity) {
    super(userEntity);
  }
}

import {Entity} from 'src/app/_helpers/entity';

export class ProvinceEntity extends Entity {
  code: string;
  name: string;

  constructor(provinceEntity?: ProvinceEntity) {
    super(provinceEntity);
  }
}

import {SearchEntity} from 'src/app/_helpers/search-entity';
import {TextFilter} from 'src/app/_shared/models/filters/TextFilter';

export class ProvinceSearchEntity extends SearchEntity {
  name: TextFilter = new TextFilter();
  code: TextFilter = new TextFilter();


  constructor(provinceSearchEntity?: ProvinceSearchEntity) {
    super(provinceSearchEntity);
  }
}

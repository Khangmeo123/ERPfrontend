import { SearchEntity } from 'src/app/_helpers/search-entity';
import { TextFilter } from '../../../../_shared/models/filters/TextFilter';

export class VoucherListSearchEntity extends SearchEntity {
  setOfBookId: string;

  code: TextFilter = new TextFilter();
  name: TextFilter = new TextFilter();

  constructor(voucherListSearchEntity?: any) {
    super(voucherListSearchEntity);
  }
}

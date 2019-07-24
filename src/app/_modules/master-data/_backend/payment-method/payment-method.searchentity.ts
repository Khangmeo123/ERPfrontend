import { SearchEntity } from 'src/app/_helpers/search-entity';
import { TextFilter } from '../../../../_shared/models/filters/TextFilter';

export class PaymentMethodSearchEntity extends SearchEntity {
  setOfBookId: string = '';
  name: TextFilter = new TextFilter();
  code: TextFilter = new TextFilter();

  constructor(paymentMethodSearchEntity?: any) {
    super(paymentMethodSearchEntity);
  }
}

import { SearchEntity } from 'src/app/_helpers/search-entity';
import { NumberFilter } from 'src/app/_shared/models/filters/NumberFilter';
import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';

export class PaymentTermSearchEntity extends SearchEntity {
  setOfBookId: string;
  legalEntityId: string;
  name: TextFilter = new TextFilter();
  code: TextFilter = new TextFilter();

  dueInDays: NumberFilter = new NumberFilter();
  discountPeriod: NumberFilter = new NumberFilter();
  discountRate: NumberFilter = new NumberFilter();

  constructor(paymentTermSearchEntity?: any) {
    super(paymentTermSearchEntity);
  }
}

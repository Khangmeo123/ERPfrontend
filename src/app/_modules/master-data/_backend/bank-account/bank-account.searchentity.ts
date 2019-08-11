import {SearchEntity} from 'src/app/_helpers/search-entity';
import {TextFilter} from '../../../../_shared/models/filters/TextFilter';

export class BankAccountSearchEntity extends SearchEntity {
  setOfBookId: string;
  accountingCode: TextFilter = new TextFilter();
  chartOfAccountId: TextFilter = new TextFilter();
  chartOfAccountCode: string;
  bankName: TextFilter = new TextFilter();
  bankCode: TextFilter = new TextFilter();
  name: TextFilter = new TextFilter();
  number: TextFilter = new TextFilter();
  description: TextFilter = new TextFilter();

  constructor(bankAccountSearchEntity?: any) {
    super(bankAccountSearchEntity);
  }
}

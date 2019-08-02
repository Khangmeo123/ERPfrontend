import { Entity } from 'src/app/_helpers/entity';

export class BankAccountEntity extends Entity {

  setOfBookId: string;

  // coaEntity:
  chartOfAccountId: string;
  chartOfAccountName: string;
  chartOfAccountCode: string;

  accountingCode: string;

  // bankEntity:
  bankId: string;
  bankCode: string;
  bankName: string;

  accountNumber: string;
  name: string;
  description: string;

  constructor(bankAccountEntity?: any) {
    super(bankAccountEntity);
  }
}

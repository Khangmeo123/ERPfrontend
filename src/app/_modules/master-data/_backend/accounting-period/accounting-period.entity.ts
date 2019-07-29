import { Entity } from 'src/app/_helpers/entity';

export class AccountingPeriodEntity extends Entity {
  // sobEntity:
  setOfBookId: string;

  fiscalYearId: string;

  validFrom: string;
  validTo: string;

  description: string;

  constructor(accountingPeriodEntity?: any) {
    super(accountingPeriodEntity);
  }
}

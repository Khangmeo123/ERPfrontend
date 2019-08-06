import { Entity } from 'src/app/_helpers/entity';

export class AccountingPeriodEntity extends Entity {
  // sobEntity:
  setOfBookId: string;

  fiscalYearId: string;

  periodTypeId: string;

  startPeriod: string;
  endPeriod: string;

  description: string;

  constructor(accountingPeriodEntity?: any) {
    super(accountingPeriodEntity);
  }
}

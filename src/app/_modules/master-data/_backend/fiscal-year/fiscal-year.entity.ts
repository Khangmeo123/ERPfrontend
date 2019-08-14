import { Entity } from 'src/app/_helpers/entity';

export class FiscalYearEntity extends Entity {
  id: string;

  setOfBookId: string;
  setOfBookCode: string;
  setOfBookName: string;

  name: string;

  valuationMethodId: string;
  valuationMethodDisplay: string;

  disabled: boolean;
  isValidated: boolean;

  startDate: string;
  endDate: string;

  statusId: string;
  statusDisplay: string;

  errors: {
    [key: string]: any;
  };

  constructor(fiscalYearEntity?: any) {
    super(fiscalYearEntity);
  }
}

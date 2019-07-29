import { Entity } from 'src/app/_helpers/entity';

export class FiscalYearEntity extends Entity {
  id: string;

  setOfBookId: string;
  setOfBookCode: string;
  setOfBookName: string;

  name: string;

  inventoryValuationMethod: string;

  disabled: boolean;
  isValidated: boolean;

  startDate: string;
  endDate: string;

  statusId: string;
  statusValue: string;

  errors: {
    [key: string]: any;
  };

  constructor(fiscalYearEntity?: any) {
    super(fiscalYearEntity);
  }
}

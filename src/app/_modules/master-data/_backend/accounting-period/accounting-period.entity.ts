import { Entity } from 'src/app/_helpers/entity';

export class AccountingPeriodEntity extends Entity {
    // sobEntity:
    sobId: string;
    fiscalYearId: string;

   fromValid: string;
   toValid: string;

    description: string;

    constructor(accountingPeriodEntity?: any) {
        super(accountingPeriodEntity);
    }
}
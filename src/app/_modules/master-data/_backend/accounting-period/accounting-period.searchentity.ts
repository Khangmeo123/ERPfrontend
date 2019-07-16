import { SearchEntity } from 'src/app/_helpers/search-entity';

export class AccountingPeriodSearchEntity extends SearchEntity {
    sobId: string;
    fiscalYearId: string;
    fromValid: string;
    toValid: string;
    description: string;

    constructor(accountingPeriodSearchEntity: any) {
        super(accountingPeriodSearchEntity);
    }
}
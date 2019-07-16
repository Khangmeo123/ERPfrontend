import { SearchEntity } from 'src/app/_helpers/search-entity';

export class FiscalYearSearchEntity extends SearchEntity {
    sobId: string;
   
    name: string;
    fromValid: string;
    toValid: string;
    valuationMethodId: string;
    statusId: string; 
    
    constructor(fiscalYearSearchEntity: any) {
        super(fiscalYearSearchEntity);
    }
}
import { Entity } from 'src/app/_helpers/entity';

export class FiscalYearEntity extends Entity {
    // sobEntity:
    name: string;
    sobId: string;

    fromValid: string;
    toValid : string;

    //phuong phap dinh gia ngam dinh
    valuationMethodId: string;
    valuationMethodCode: string;
    valuationMethodName: string;

    //trang thai
    statusId: string;
    statusCode: string;
    statusName: string;

    constructor(fiscalYearEntity?: any) {
        super(fiscalYearEntity);
    }
}
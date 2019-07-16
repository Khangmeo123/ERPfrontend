import { Entity } from 'src/app/_helpers/entity';

export class CoaEntity extends Entity {
    // sobEntity:
    sobId: string;

    accountNumber: string;
    accountName: string;

    // propertyEntity:
    propertyId: string;
    propertyCode: string;
    propertyName: string;

    // coaEntity:
    coaParentId: string;
    coaParentAccountNumber: string;

    description: string;

    constructor(coaEntity?: any) {
        super(coaEntity);
    }
}
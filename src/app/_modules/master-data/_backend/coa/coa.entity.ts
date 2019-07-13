import { Entity } from 'src/app/_helpers/entity';

export class CoaEntity extends Entity {
    // storyBookEntity:
    storyBookId: string;

    accountNumber: number;
    accountName: string;

    // propertyEntity:
    propertyId: string;
    propertyCode: string;
    propertyName: string;

    // coaEntity:
    coaParentId: string;
    coaParentAccountNumber: string;

    description: string;

    constructor(coaEntity: any) {
        super(coaEntity);
    }
}
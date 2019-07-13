import { SearchEntity } from 'src/app/_helpers/search-entity';

export class CoaSearchEntity extends SearchEntity {
    storyBookId: string;
    accountNumber: string;
    accountName: string;
    propertyId: string;
    description: string;

    constructor(coaSearchEntity: any) {
        super(coaSearchEntity);
    }
}
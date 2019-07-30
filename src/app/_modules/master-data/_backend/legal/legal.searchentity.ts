import { SearchEntity } from 'src/app/_helpers/search-entity';

export class LegalSearchEntity extends SearchEntity {
    legalEntityId: string;
   
    code: string;
    name: string;

    constructor(legalSearchEntity?: any) {
        super(legalSearchEntity);
    }
}
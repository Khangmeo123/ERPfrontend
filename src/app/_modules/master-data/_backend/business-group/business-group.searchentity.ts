import { SearchEntity } from 'src/app/_helpers/search-entity';

export class BusinessGroupSearchEntity extends SearchEntity {
    
    code: String;
    name: String;
    description: string;

    constructor(businessGroupSearchEntity?: any) {
        super(businessGroupSearchEntity);
    }
}
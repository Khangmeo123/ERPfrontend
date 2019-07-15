import { SearchEntity } from 'src/app/_helpers/search-entity';

export class BusinessGroupSearchEntity extends SearchEntity {
    name: string;
    code: string;
    description: string;
    constructor(businessGroupSearchEntity?: any) {
        super(businessGroupSearchEntity);
    }
}
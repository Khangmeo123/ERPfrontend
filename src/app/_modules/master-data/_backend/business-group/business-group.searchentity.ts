import { SearchEntity } from 'src/app/_helpers/search-entity';

export class BusinessGroupSearchEntity extends SearchEntity {
<<<<<<< HEAD
    
    code: String;
    name: String;
    description: string;

=======
    name: string;
    code: string;
    description: string;
>>>>>>> a7f7e305f0033334e04439c91bba1e9c7f5b19c3
    constructor(businessGroupSearchEntity?: any) {
        super(businessGroupSearchEntity);
    }
}
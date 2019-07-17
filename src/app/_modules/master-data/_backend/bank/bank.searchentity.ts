import { TextFilter } from './../../../../_shared/models/filters/TextFilter';
import { SearchEntity } from 'src/app/_helpers/search-entity';

export class BankSearchEntity extends SearchEntity {
    name: TextFilter = new TextFilter();
    code: TextFilter = new TextFilter();
    description: TextFilter = new TextFilter();

    constructor(bankSearchEntity?: any) {
        super(bankSearchEntity);
    }
}
import { SearchEntity } from 'src/app/_helpers/search-entity';
import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';

export class SobSearchEntity extends SearchEntity {
    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();
    currencyId: string;
    coa : string;

    constructor(sobSearchEntity?: any) {
        super(sobSearchEntity);
    }
}
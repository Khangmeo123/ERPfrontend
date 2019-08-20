import { SearchEntity } from 'src/app/_helpers/search-entity';
import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';

export class UomSearchEntity extends SearchEntity {
    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();
    description: TextFilter = new TextFilter();

    constructor(uomSearchEntity?: any) {
        super(uomSearchEntity);
    }
}

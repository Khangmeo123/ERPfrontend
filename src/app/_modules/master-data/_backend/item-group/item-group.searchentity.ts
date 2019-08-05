import { SearchEntity } from 'src/app/_helpers/search-entity';
import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';

export class ItemGroupSearchEntity extends SearchEntity {
    sobId: string;
    legalEntityId: string;
    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();
    description: TextFilter = new TextFilter();

    constructor(itemGroupSearchEntity?: any) {
        super(itemGroupSearchEntity);
    }
}

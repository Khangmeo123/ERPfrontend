import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';
import { SearchEntity } from 'src/app/_helpers/search-entity';
import { NumberFilter } from 'src/app/_shared/models/filters/NumberFilter';

export class ItemSearchEntity extends SearchEntity {
    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();
    description: TextFilter = new TextFilter();
    unitPrice: NumberFilter = new NumberFilter();
    uomId: string;
    statusId: string;

    constructor(itemSearchEntity?: any) {
        super(itemSearchEntity);
    }
}
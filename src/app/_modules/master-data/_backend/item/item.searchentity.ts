import { LegalEntity } from 'src/app/_modules/master-data/_backend/legal/legal.entity';
import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';
import { SearchEntity } from 'src/app/_helpers/search-entity';
import { NumberFilter } from 'src/app/_shared/models/filters/NumberFilter';

export class ItemSearchEntity extends SearchEntity {
    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();
    description: TextFilter = new TextFilter();
    primaryPrice: NumberFilter = new NumberFilter();
    uomId: string;
    statusId: string;
    legalEntityId: string;
    itemGroupingId: string;
    constructor(itemSearchEntity?: any) {
        super(itemSearchEntity);
    }
}
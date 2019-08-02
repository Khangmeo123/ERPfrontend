import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';
import { SearchEntity } from 'src/app/_helpers/search-entity';

export class DivisionSearchEntity extends SearchEntity {
    name: TextFilter = new TextFilter();
    code: TextFilter = new TextFilter();
    address: TextFilter = new TextFilter();
    legalEntityId: string;

    constructor(divisionSearchEntity?: any) {
        super(divisionSearchEntity);
    }
}
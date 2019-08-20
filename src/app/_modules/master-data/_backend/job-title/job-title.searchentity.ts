import { SearchEntity } from 'src/app/_helpers/search-entity';
import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';

export class JobTitleSearchEntity extends SearchEntity {
    name: TextFilter = new TextFilter();
    code: TextFilter = new TextFilter();
    description: TextFilter = new TextFilter();

    constructor(jobTitleSearchEntity?: any) {
        super(jobTitleSearchEntity);
    }
}

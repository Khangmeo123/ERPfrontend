import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';
import { SearchEntity } from 'src/app/_helpers/search-entity';

export class JobLevelSearchEntity extends SearchEntity {
    name: TextFilter = new TextFilter();
    code: TextFilter = new TextFilter();
    description: TextFilter = new TextFilter();
    jobTitleId: string;

    constructor(jobLevelSearchEntity?: any) {
        super(jobLevelSearchEntity);
    }
}
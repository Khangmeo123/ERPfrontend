import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';
import { SearchEntity } from 'src/app/_helpers/search-entity';
import { NumberFilter } from 'src/app/_shared/models/filters/NumberFilter';

export class JobLevelSearchEntity extends SearchEntity {
    level: NumberFilter = new NumberFilter();
    description: TextFilter = new TextFilter();

    constructor(jobLevelSearchEntity?: any) {
        super(jobLevelSearchEntity);
    }
}

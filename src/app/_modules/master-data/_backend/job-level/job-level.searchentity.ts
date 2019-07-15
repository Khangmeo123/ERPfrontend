import { SearchEntity } from 'src/app/_helpers/search-entity';

export class JobLevelSearchEntity extends SearchEntity {
    name: string;
    code: string;
    description: string;
    jobTitleId: string;

    constructor(jobLevelSearchEntity?: any) {
        super(jobLevelSearchEntity);
    }
}
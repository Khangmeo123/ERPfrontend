import { SearchEntity } from 'src/app/_helpers/search-entity';

export class JobTitleSearchEntity extends SearchEntity {
    name: string;
    code: string;
    description: string;

    constructor(jobTitleSearchEntity?: any) {
        super(jobTitleSearchEntity);
    }
}
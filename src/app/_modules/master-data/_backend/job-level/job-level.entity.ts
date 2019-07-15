import { Entity } from 'src/app/_helpers/entity';

export class JobLevelEntity extends Entity {
    name: string;
    code: string;
    description: string;

    // jobTitleEntity:
    jobTitleId: string;
    jobTitleName: string;
    jobTitleCode: string;

    constructor(jobLevelEntity?: any) {
        super(jobLevelEntity);
    }
}
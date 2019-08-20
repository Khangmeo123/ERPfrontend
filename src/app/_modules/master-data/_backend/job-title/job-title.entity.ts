import { Entity } from 'src/app/_helpers/entity';

export class JobTitleEntity extends Entity {
    name: string;
    code: string;
    description: string;

    constructor(jobTitleEntity?: any) {
        super(jobTitleEntity);
    }
}

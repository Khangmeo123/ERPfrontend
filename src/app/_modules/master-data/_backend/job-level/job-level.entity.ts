import { Entity } from 'src/app/_helpers/entity';

export class JobLevelEntity extends Entity {
    level: number;
    description: string;

    constructor(jobLevelEntity?: any) {
        super(jobLevelEntity);
    }
}

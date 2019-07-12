import { Entity } from 'src/app/_helpers/entity';

export class StoryBookEntity extends Entity {
    code: string;
    name: string;

    // currencyEntity:
    currencyId: string;
    currencyCode: string;
    currencyName: string;

    constructor(storyBookEntity: any) {
        super(storyBookEntity);
    }
}
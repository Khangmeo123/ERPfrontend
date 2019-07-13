import { SearchEntity } from 'src/app/_helpers/search-entity';

export class StoryBookSearchEntity extends SearchEntity {
    code: string;
    name: string;
    currencyId: string;

    constructor(storyBookSearchEntity: any) {
        super(storyBookSearchEntity);
    }
}
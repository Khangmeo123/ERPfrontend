import { SearchEntity } from 'src/app/_helpers/search-entity';

export class SobSearchEntity extends SearchEntity {
    code: string;
    name: string;
    currencyId: string;

    constructor(sobSearchEntity: any) {
        super(sobSearchEntity);
    }
}
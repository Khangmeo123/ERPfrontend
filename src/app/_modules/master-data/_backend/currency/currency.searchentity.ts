import { SearchEntity } from 'src/app/_helpers/search-entity';

export class CurrencySearchEntity extends SearchEntity {
    code: string;
    name: string;
    description: string;

    constructor(currencySearchEntity?: any) {
        super(currencySearchEntity);
    }
}
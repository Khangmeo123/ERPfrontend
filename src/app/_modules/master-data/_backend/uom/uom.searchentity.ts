import { SearchEntity } from 'src/app/_helpers/search-entity';

export class UomSearchEntity extends SearchEntity {
    code: string;
    name: string;
    description: string;

    constructor(uomSearchEntity?: any) {
        super(uomSearchEntity);
    }
}
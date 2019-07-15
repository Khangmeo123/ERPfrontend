import { SearchEntity } from 'src/app/_helpers/search-entity';

export class InfoContactSearchEntity extends SearchEntity {
    name: string;
    phone: string;
    email: string;
    address: string;

    constructor(infoContactSearchEntity?: any) {
        super(infoContactSearchEntity);
    }
}
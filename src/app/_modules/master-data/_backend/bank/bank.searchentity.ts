import { SearchEntity } from 'src/app/_helpers/search-entity';

export class BankSearchEntity extends SearchEntity {
    name: string;
    code: string;

    constructor(bankSearchEntity: any) {
        super(bankSearchEntity);
    }
}
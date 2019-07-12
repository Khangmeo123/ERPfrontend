import { SearchEntity } from 'src/app/_helpers/search-entity';

export class UnitSearchEntity extends SearchEntity {
    code: string;
    name: string;
    description: string;

    constructor(unitSearchEntity: any) {
        super(unitSearchEntity);
    }
}
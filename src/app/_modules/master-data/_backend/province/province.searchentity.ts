import { SearchEntity } from 'src/app/_helpers/search-entity';

export class ProvinceSearchEntity extends SearchEntity {
    name: string;
    code: string;

    
    constructor(provinceSearchEntity?: any) {
        super(provinceSearchEntity);
    }
}
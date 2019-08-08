import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';
import { LoDashImplicitNumberArrayWrapper } from 'lodash';
import { SearchEntity } from 'src/app/_helpers/search-entity';

export class UserEntity {
    id: string = null;
    name: string = null;
    email: string = null;
    displayName: string = null;
    isSelected: boolean = false;
    isActive: boolean = false;


    constructor(userEntity: any = null) {
    }
}

export class SearchUserEntity extends SearchEntity{
    id: string;
    name: TextFilter = new TextFilter();
    skip: number = 0;
    take: number = 10;
    constructor(userSearchEntity: any = null) {
        super(userSearchEntity);
    }
}


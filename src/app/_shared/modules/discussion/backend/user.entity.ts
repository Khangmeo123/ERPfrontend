import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';
import { LoDashImplicitNumberArrayWrapper } from 'lodash';

export class UserEntity {
    id: string = null;
    name: string = null;
    email: string = null;
    display: string = null;
    isSelected: boolean = false;
    isActive: boolean = false;

    constructor(userEntity: any = null) {
    }
}

export class SearchUserEntity {
    id: string;
    name: TextFilter = new TextFilter();
    skip: number = 0;
    take: number = 10;
}


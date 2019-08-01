import { Entity } from 'src/app/_helpers/entity';

export class InfoContactEntity extends Entity {
    name: string;
    phone: string;
    email: string;
    address: string;
    provinceName: string;
    provinceId: string;
    relationship: string;

    constructor(infoContactEntity?: any) {
        super(infoContactEntity);
    }
}
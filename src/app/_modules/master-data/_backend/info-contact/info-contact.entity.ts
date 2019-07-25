import { Entity } from 'src/app/_helpers/entity';

export class InfoContactEntity extends Entity {
    supplierDetailId: string;
    fullName: string;
    phone: string;
    email: string;
    address: string;
    description: string;
    provinceId: string;
    provinceName: string;

    constructor(infoContactEntity?: any) {
        super(infoContactEntity);
    }
}
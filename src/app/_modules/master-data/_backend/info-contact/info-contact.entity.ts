import { Entity } from 'src/app/_helpers/entity';

export class InfoContactEntity extends Entity {
    name: string;
    phone: string;
    email: string;
    address: string;

    constructor(infoContactEntity: any) {
        super(infoContactEntity);
    }
}
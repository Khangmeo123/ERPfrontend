import { Entity } from 'src/app/_helpers/entity';

export class LegalEntity extends Entity {
    setOfBookCode: string;
    setOfBookId: string;
    code: string;
    name: string;

    constructor(legalEntity?: any) {
        super(legalEntity);
    }
}
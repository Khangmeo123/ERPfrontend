import { Entity } from 'src/app/_helpers/entity';

export class SobEntity extends Entity {
    code: string;
    name: string;

    coaId: string;
    coaName: string;
    coaCode: string;

    currencyId: string;
    currencyCode: string;
    currencyName: string;

    sctId: string;
    sctCode: string;
    sctName: string;

    vatId: string;
    vatCode: string;
    vatName: string;

    nrtId: string;
    nrtCode: string;
    nrtName: string;

    entId: string;
    entCode: string;
    entName: string;

    extId: string;
    extCode: string;
    extName: string;

    imtId: string;
    imtCode: string;
    imtName: string;

    constructor(sobEntity?: any) {
        super(sobEntity);
    }
}

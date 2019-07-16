import { Entity } from 'src/app/_helpers/entity';

export class SobEntity extends Entity {
    code: string;
    name: string;

    //he thong tai khoan ke toan
    coaId: string;
    coaName: string;
    coacode: string;

    // currencyEntity:
    currencyId: string;
    currencyCode: string;
    currencyName: string;

    //bieu thue tieu thu dac biêt
    sctId : string;
    sctCode: string;
    sctName: string;

    //bieu thue GTGT
    vatId : string;
    vatCode: string;
    vatName: string;

    //bieu thue tai nguyen
    nrtId : string;
    nrtCode: string;
    nrtName: string;

    //bieu thue moi truong
    entId : string;
    entCode: string;
    entName: string;

    //bieu thue xuat khau
    extId : string;
    extCode: string;
    extName: string;

    //bieu thue nhap khau
    imtId : string;
    imtCode: string;
    imtName: string;


    constructor(sobEntity?: any) {
        super(sobEntity);
    }
}
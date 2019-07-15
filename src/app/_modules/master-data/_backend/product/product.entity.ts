import { Entity } from 'src/app/_helpers/entity';
import { StringNullableChain } from 'lodash';

export class ProductEntity extends Entity {
    code: string;
    codeFromSupplier: string;
    codeFromMarket: string;
    name: string;

    // propertyEntity:
    propertyName: string;
    propertyCode: string;
    propertyId: string;

    // unitEntity:
    uomName: string;
    uomCode: string;
    uomId: string;

    unitPrice: number;
    weight: number;

    // statusEntity:
    statusName: string;
    statusCode: string;
    statusId: string;

    height: number;
    length: number;
    width: number;
    img: string;
    description: string;

    // vatEntity:
    vatId: string;
    vatCode: string;
    vatName: string;
    vatValue: number;

    // nrtEntity:
    nrtId: string;
    nrtCode: string;
    nrtName: string;
    nrtValue: number;

    // entEntity:
    entId: string;
    entCode: string;
    entName: string;
    entValue: number;

    // imtEntity:
    imtId: string;
    imtCode: string;
    imtName: string;
    imtValue: number;

    // extEntity:
    extId: string;
    extCode: string;
    extName: string;
    extValue: number;

    // sctEntity;
    sctId: string;
    sctCode: string;
    sctName: string;
    sctValue: number;

    constructor(productEntity: any) {
        super(productEntity);
    }
}
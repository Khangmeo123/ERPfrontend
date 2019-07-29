import { Entity } from 'src/app/_helpers/entity';

export class LegalItemDetailEntity extends Entity {
    code: string;
    codeFromSupplier: string;
    codeFromMarket: string;
    name: string;

    // characteristicEntity:
    characteristicName: string;
    characteristicId: string;

    // unitEntity:
    uomName: string;
    uomId: string;

    unitPrice: number;
    weight: number;

    // statusEntity:
    statusName: string;
    statusId: string;

    height: number;
    length: number;
    width: number;
    img: string;
    description: string;



    constructor(legalItemDetailEntity?: any) {
        super(legalItemDetailEntity);
    }
}
import { Entity } from 'src/app/_helpers/entity';

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
    unitName: string;
    unitCode: string;
    unitId: string;

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

    constructor(productEntity: any) {
        super(productEntity);
    }
}
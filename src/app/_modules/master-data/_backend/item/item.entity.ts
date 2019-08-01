import { Entity } from 'src/app/_helpers/entity';

export class ItemEntity extends Entity {
    code: string;
    codeFromSupplier: string;
    codeFromMarket: string;
    name: string;

    // propertyEntity:
    characteristicName: string;
    characteristicId: string;

    // unitEntity:
    unitOfMeasureName: string;
    unitOfMeasureId: string;

    unitPrice: number;
    weight: number;

    // statusEntity:
    statusName: string;
    statusId: string;

    height: number;
    length: number;
    width: number;
    image: string;
    description: string;

    constructor(itemEntity: any) {
        super(itemEntity);
    }
}

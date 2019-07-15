import { Entity } from 'src/app/_helpers/entity';

export class AssetEntity extends Entity {
    code: string;
    name: string;

    // typeEntity:
    typeName: string;
    typeCode: string;
    typeId: string;

    // statusEntity:
    statusName: string;
    statusCode: string;
    statusId: string;

    constructor(assetEntity?: any) {
        super(assetEntity);
    }
}
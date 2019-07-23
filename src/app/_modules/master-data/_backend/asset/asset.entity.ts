import { Entity } from 'src/app/_helpers/entity';

export class AssetEntity extends Entity {
    code: string;
    name: string;

    // typeEntity:
    typeName: string;
    typeId: string;

    // statusEntity:
    statusName: string;
    statusId: string;

    constructor(assetEntity?: any) {
        super(assetEntity);
    }
}
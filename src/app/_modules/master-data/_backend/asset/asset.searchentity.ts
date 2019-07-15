import { SearchEntity } from 'src/app/_helpers/search-entity';

export class AssetSearchEntity extends SearchEntity {
    code: string;
    name: string;
    typeId: string;
    statusId: string;

    constructor(assetSearchEntity?: any) {
        super(assetSearchEntity);
    }
}
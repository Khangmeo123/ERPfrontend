import { TextFilter } from './../../../../_shared/models/filters/TextFilter';
import { SearchEntity } from 'src/app/_helpers/search-entity';

export class AssetSearchEntity extends SearchEntity {
    code: TextFilter = new TextFilter();
    name: TextFilter = new TextFilter();
    typeId: string;
    statusId: string;

    constructor(assetSearchEntity?: any) {
        super(assetSearchEntity);
    }
}
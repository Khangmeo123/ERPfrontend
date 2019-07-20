import { SearchEntity } from 'src/app/_helpers/search-entity';

export class ResourceTaxSearchentity extends SearchEntity {
    sobId: string;
    taxCode: string;
    taxType: string;
    uomId: string;
    taxRate: number;
    description: string;

    constructor(resoureTariffSearchEntity?: any) {
        super(resoureTariffSearchEntity);
    }
}

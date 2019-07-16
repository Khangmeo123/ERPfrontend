import { SearchEntity } from 'src/app/_helpers/search-entity';

export class ImportTariffSearchEntity extends SearchEntity {
    sobId: string;
    taxCode: string;
    taxType: string;
    uomId: string;
    taxRate: number;
    description: string;

    constructor(importTariffSearchEntity?: any) {
        super(importTariffSearchEntity);
    }
}
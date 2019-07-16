import { SearchEntity } from 'src/app/_helpers/search-entity';

export class ExportTariffSearchEntity extends SearchEntity {
    sobId: string;
    taxCode: string;
    taxType: string;
    uomId: string;
    taxRate: number;
    description: string;

    constructor(exportTariffSearchEntity?: any) {
        super(exportTariffSearchEntity);
    }
}
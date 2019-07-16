import { Entity } from 'src/app/_helpers/entity';

export class ImportTariffEntity extends Entity {
    // sobEntity:
    sobId: string;

    taxCode: string;

    // taxtypeEntity:
    taxType : string;

    // uomEntity:
    uomId: string;
    uomName: string;
    uomCode: string;

    // coaEntity:
    coaId: string;
    coaName: string;
    coaCode: string;

    taxRate: number;
    description: string;

    constructor(importTariffEntity?: any) {
        super(importTariffEntity);
    }
}
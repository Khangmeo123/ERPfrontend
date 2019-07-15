import { Entity } from 'src/app/_helpers/entity';

export class EnviTariffEntity extends Entity {
    // sobEntity:
    sobId: string;

    taxCode: string;

    // taxtypeEntity:
    taxType : string;

    // unitEntity:
    unitId: string;
    unitName: string;
    unitCode: string;

    // coaEntity:
    coaId: string;
    coaName: string;
    coaCode: string;

    taxRate: number;
    description: string;

    constructor(enviTariffEntity?: any) {
        super(enviTariffEntity);
    }
}
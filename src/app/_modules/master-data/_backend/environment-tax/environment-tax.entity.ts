import { Entity } from 'src/app/_helpers/entity';

export class EnvironmentTaxEntity extends Entity {
    // sobEntity:
    sobId: string;

    taxCode: string;

    // taxtypeEntity:
    taxType : string;

    // uomEntity:
    unitOfMeasureId: string;
    unitOfMeasureName: string;
    unitOfMeasureCode: string;

    // coaEntity:
    coaId: string;
    coaName: string;
    coaCode: string;

    taxRate: number;
    description: string;

    constructor(environmentTariffEntity?: any) {
        super(environmentTariffEntity);
    }
}

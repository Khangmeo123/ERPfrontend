import { Entity } from 'src/app/_helpers/entity';

export class ExciseTariffEntity extends Entity {
    // storyBookEntity:
    storyBookId: string;

    taxCode: string;

    // taxtypeEntity:
    taxTypeId: string;
    taxTypeCode: string;
    taxTypeName: string;

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

    constructor(exciseTariffEntity: any) {
        super(exciseTariffEntity);
    }
}
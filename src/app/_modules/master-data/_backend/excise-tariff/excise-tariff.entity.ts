import { Entity } from 'src/app/_helpers/entity';

export class ExciseTariffEntity extends Entity {
    // sobEntity:
    sobId: string;

    taxCode: string;

    // taxtypeEntity:
    taxType: string;

    // unitEntity:
    //don vi tinh
    unitId: string;
    unitName: string;
    unitCode: string;

    // coaEntity:
    //tai khoan tong hop
    coaId: string;
    coaName: string;
    coaCode: string;

    taxRate: number;
    description: string;

    constructor(exciseTariffEntity?: any) {
        super(exciseTariffEntity);
    }
}
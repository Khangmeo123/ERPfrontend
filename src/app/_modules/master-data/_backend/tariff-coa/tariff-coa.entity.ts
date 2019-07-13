import { Entity } from 'src/app/_helpers/entity';

export class TariffCoaEntity extends Entity {
    // sobEntity:
    sobId: string;
    sobCode: string;
    sobName: string;

    // tariffEntity:
    tariffId: string;
    tariffName: string;
    tariffCode: string;

    // coaEntity:
    coaId: string;
    coaName: string;
    coaCode: string;

    constructor(tariffCoaEntity: any) {
        super(tariffCoaEntity);
    }
}
import { Entity } from 'src/app/_helpers/entity';

export class TariffCoaEntity extends Entity {
    // storyBookEntity:
    storyBookId: string;
    storyBookCode: string;
    storyBookName: string;

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
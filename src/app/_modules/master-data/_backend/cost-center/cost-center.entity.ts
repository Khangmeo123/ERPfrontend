import { Entity } from 'src/app/_helpers/entity';

export class CostCenterEntity extends Entity {
    // sobEntity:
    sobId: string;

    code: string;
    name: string;
    fromValid: string;
    toValid: string;

    // coaEntity:
    coaId: string;
    coaAccountNumber: number;

    description: string;

    constructor(costCenterEntity: any) {
        super(costCenterEntity);
    }
}
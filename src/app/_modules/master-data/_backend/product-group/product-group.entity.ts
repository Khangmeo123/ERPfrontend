import { Entity } from 'src/app/_helpers/entity';

export class ProductGroupEntity extends Entity {
    // sobEntity:
    sobId: string;
    legalId:string;

    code: string;
    name:string;
    
    description:string;
    
    constructor(productGroupEntity: any) {
        super(productGroupEntity);
    }
}
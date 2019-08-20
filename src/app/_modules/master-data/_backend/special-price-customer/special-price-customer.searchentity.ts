import { SearchEntity } from 'src/app/_helpers/search-entity';

export class SpecialPriceCustomerSearchEntity extends SearchEntity {
    sobId: string;
    legalId: string;
    supplierId: string;

    itemGroupId: string;
    itemId: string;


    fromValid: string;
    toValid: string;

    discount: number;
    description: string;

    constructor(specialPriceCustomerSearchEntity: any) {
        super(specialPriceCustomerSearchEntity);
    }
}

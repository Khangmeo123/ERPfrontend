import { SearchEntity } from 'src/app/_helpers/search-entity';

export class PaymentMethodSearchEntity extends SearchEntity {
    sobId: string;
   
    name: string;
    code: string;
    
    constructor(paymentMethodSearchEntity: any) {
        super(paymentMethodSearchEntity);
    }
}
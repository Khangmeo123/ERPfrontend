import { Entity } from 'src/app/_helpers/entity';

export class PaymentMethodEntity extends Entity {
    // sobEntity:
   
    sobId: string;
    
    code: string;
    name: string;
   
    constructor(paymentMethodEntity?: any) {
        super(paymentMethodEntity);
    }
}
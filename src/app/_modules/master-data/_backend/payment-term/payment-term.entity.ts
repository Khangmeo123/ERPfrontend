import { Entity } from 'src/app/_helpers/entity';

export class PaymentTermEntity extends Entity {
    // sobEntity:
    
    sobId: string;

    name: string;
    code: string;
    dueInDate: number;
    discountPeriod: number;
    discountRate: number;
   

    constructor(paymentTermEntity?: any) {
        super(paymentTermEntity);
    }
}
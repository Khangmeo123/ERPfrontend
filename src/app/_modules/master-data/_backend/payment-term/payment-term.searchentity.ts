import { SearchEntity } from 'src/app/_helpers/search-entity';

export class PaymentTermSearchEntity extends SearchEntity {
    sobId: string;
   
    name: string;
    code: string;

    dueInDate: number;
    discountPeriod: number;
    discountRate: number;




    
    constructor(paymentTermSearchEntity: any) {
        super(paymentTermSearchEntity);
    }
}
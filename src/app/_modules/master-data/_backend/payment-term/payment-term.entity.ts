import { Entity } from 'src/app/_helpers/entity';

export class PaymentTermEntity extends Entity {
  // sobEntity:

  setOfBookId: string;

  name: string;
  code: string;
  dueInDays: number;
  discountPeriod: number;
  discountRate: number;


  constructor(paymentTermEntity?: any) {
    super(paymentTermEntity);
  }
}

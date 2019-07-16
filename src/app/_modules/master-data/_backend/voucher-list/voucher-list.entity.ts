import { Entity } from 'src/app/_helpers/entity';

export class VoucherListEntity extends Entity {
    // sobEntity:
    
    sobId: string;

    name: string;
    code: string;

    debtId: string;
    debtCode: string;
    debtName: string;

    creditId: string;
    creditCode: string;
    creditName: string;

    typeVoucherId: string;
    typeVoucherCode: string;
    typeVoucherName: string;

    description: string;
   

    constructor(voucherListEntity?: any) {
        super(voucherListEntity);
    }
}
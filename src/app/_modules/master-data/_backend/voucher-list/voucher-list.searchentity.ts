import { SearchEntity } from 'src/app/_helpers/search-entity';

export class VoucherListSearchEntity extends SearchEntity {
    sobId: string;
   
    code: string;
    name: string;
    debtId: string;
    creditId: string;
    typeName: string;
    description: string;

   
    
    constructor(voucherListSearchEntity: any) {
        super(voucherListSearchEntity);
    }
}
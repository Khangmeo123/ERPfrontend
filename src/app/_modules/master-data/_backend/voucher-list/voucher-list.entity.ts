import { Entity } from 'src/app/_helpers/entity';

export class VoucherListEntity extends Entity {
  // sobEntity:

  setOfBookId: string;

  name: string;
  code: string;

  constructor(voucherListEntity?: any) {
    super(voucherListEntity);
  }
}

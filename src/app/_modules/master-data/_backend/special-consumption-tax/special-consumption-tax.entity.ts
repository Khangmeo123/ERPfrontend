import { Entity } from 'src/app/_helpers/entity';

export class SpecialConsumptionTaxEntity extends Entity {
  // sobEntity:
  setOfBookId: string;

  taxCode: string;

  // taxtypeEntity:
  taxType: string;

  // uomEntity:
  //don vi tinh
  uomId: string;
  uomName: string;
  uomCode: string;

  // coaEntity:
  //tai khoan tong hop
  chartOfAccountId: string;
  chartOfAccountName: string;
  chartOfAccountCode: string;

  taxRate: number;
  description: string;

  constructor(exciseTariffEntity?: any) {
    super(exciseTariffEntity);
  }
}

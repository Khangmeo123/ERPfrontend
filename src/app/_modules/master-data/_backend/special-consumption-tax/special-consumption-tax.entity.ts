import { Entity } from 'src/app/_helpers/entity';

export class SpecialConsumptionTaxEntity extends Entity {
  // sobEntity:
  setOfBookId: string;

  taxCode: string;

  name: string;

  // taxtypeEntity:
  taxType: string;

  // uomEntity:
  //don vi tinh
  unitOfMeasureId: string;
  unitOfMeasureName: string;
  unitOfMeasureCode: string;

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

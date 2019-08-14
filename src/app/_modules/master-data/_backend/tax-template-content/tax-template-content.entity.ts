import {Entity} from 'src/app/_helpers/entity';

export class TaxTemplateContentEntity extends Entity {

  taxCode: string;

  name: string;

  // taxtypeEntity:
  taxType: string;

  // uomEntity:
  // don vi tinh
  unitOfMeasureId: string;
  unitOfMeasureName: string;
  unitOfMeasureCode: string;

  // coaEntity:
  // tai khoan tong hop
  chartOfAccountId: string;
  chartOfAccountName: string;
  chartOfAccountCode: string;

  rate: number;
  description: string;

  constructor(taxTemplateDetailEntity?: any) {
    super(taxTemplateDetailEntity);
  }
}

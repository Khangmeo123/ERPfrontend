import { Entity } from 'src/app/_helpers/entity';

export class SobEntity extends Entity {
  code: string;
  name: string;

  chartOfAccountTemplateId: string;
  chartOfAccountTemplateName: string;
  chartOfAccountTemplateCode: string;

  currencyId: string;
  currencyCode: string;
  currencyName: string;

  specialConsumptionTaxTemplateId: string;
  specialConsumptionTaxTemplateCode: string;
  specialConsumptionTaxTemplateName: string;

  valueAddedTaxTemplateId: string;
  valueAddedTaxTemplateCode: string;
  valueAddedTaxTemplateName: string;

  naturalResourceTaxTemplateId: string;
  naturalResourceTaxTemplateCode: string;
  naturalResourceTaxTemplateName: string;

  environmentTaxTemplateId: string;
  environmentTaxTemplateCode: string;
  environmentTaxTemplateName: string;

  exportTaxTemplateId: string;
  exportTaxTemplateCode: string;
  exportTaxTemplateName: string;

  importTaxTemplateId: string;
  importTaxTemplateCode: string;
  importTaxTemplateName: string;

  constructor(sobEntity?: any) {
    super(sobEntity);
  }
}

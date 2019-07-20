import { FormModel } from '../../../../_helpers/form-model';
import { FormControl } from '@angular/forms';
import { ImportTaxEntity } from 'src/app/_modules/master-data/_backend/import-tax/import-tax.entity';
import { requiredField } from 'src/app/_helpers';

export class ImportTaxForm extends FormModel {

  taxCode = new FormControl('', [requiredField]);
  taxType = new FormControl('', [requiredField]);

  // don vi tien te
  uomId = new FormControl('');
  uomName = new FormControl('');

  // tai khoan tong hop
  coaId = new FormControl('');
  coaName = new FormControl('');


  taxRate = new FormControl('');
  description = new FormControl('');

  constructor(importTariffEntity?: ImportTaxEntity) {
    super();
    if (importTariffEntity !== null && importTariffEntity !== undefined) {
      Object.keys(importTariffEntity).forEach((item) => {
        if (importTariffEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
          this[item].setValue(importTariffEntity[item]);
        }
      });
    }
  }
}

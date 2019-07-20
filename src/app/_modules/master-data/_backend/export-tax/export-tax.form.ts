import { FormModel } from '../../../../_helpers/form-model';
import { FormControl, Validators, FormGroup, AbstractControl, RequiredValidator, FormArray } from '@angular/forms';
import { ExportTaxEntity } from 'src/app/_modules/master-data/_backend/export-tax/export-tax.entity';
import { requiredField, checkLength } from 'src/app/_helpers';

export class ExportTaxForm extends FormModel {

    taxCode = new FormControl('', [requiredField]);
    taxType = new FormControl('', [requiredField]);

    //don vi tinh
    uomId = new FormControl('');
    uomName = new FormControl('');

    //tai khoan tong hop
    coaId = new FormControl('');
    coaName = new FormControl('');



    taxRate = new FormControl('');
    description = new FormControl('');

    constructor(exportTariffEntity?: ExportTaxEntity) {
        super();
        if (exportTariffEntity !== null && exportTariffEntity !== undefined) {
            Object.keys(exportTariffEntity).forEach((item) => {
                if (exportTariffEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
                    this[item].setValue(exportTariffEntity[item]);
                }
            });
        }
    }
}

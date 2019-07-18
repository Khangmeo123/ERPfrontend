import { FormModel } from '../../../../_helpers/form-model';
import { FormControl, Validators, FormGroup, AbstractControl, RequiredValidator, FormArray } from '@angular/forms';
import { ImportTariffEntity } from 'src/app/_modules/master-data/_backend/import-tariff/import-tariff.entity';
import { requiredField, checkLength } from 'src/app/_helpers';

export class ExportTariffForm extends FormModel {

    taxCode = new FormControl('', [requiredField]);
    taxType = new FormControl('', [requiredField]);

    //don vi tien te
    uomId = new FormControl('');
    uomName = new FormControl('');

    //tai khoan tong hop
    coaId = new FormControl('');
    coaName = new FormControl('');



    taxRate = new FormControl('');
    description = new FormControl('');

    constructor(importTariffEntity?: ImportTariffEntity) {
        super();
    }
}
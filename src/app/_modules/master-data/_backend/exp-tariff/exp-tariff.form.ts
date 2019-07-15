import { FormModel } from './../../../../_helpers/form-model';
import { FormControl, Validators, FormGroup, AbstractControl, RequiredValidator, FormArray } from '@angular/forms';
import { ExpTariffEntity } from 'src/app/_modules/master-data/_backend/exp-tariff/exp-tariff.entity';
import { requiredField, checkLength } from 'src/app/_helpers';

export class ExpTariffForm extends FormModel{

    taxCode = new FormControl('',[requiredField]);
    taxType = new FormControl('',[requiredField]);

    //don vi tien te
    unitId = new FormControl('');
    unitName = new FormControl('');

    //tai khoan tong hop
    coaId = new FormControl('');
    coaName = new FormControl('');

    

    taxRate = new FormControl('');
    description = new FormControl('');

    constructor(expTariffEntity?: ExpTariffEntity) {
        super(expTariffEntity);
    }
}
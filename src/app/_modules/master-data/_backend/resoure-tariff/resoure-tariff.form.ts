import { FormModel } from './../../../../_helpers/form-model';
import { FormControl, Validators, FormGroup, AbstractControl, RequiredValidator, FormArray } from '@angular/forms';
import { ResoureTariffEntity } from 'src/app/_modules/master-data/_backend/resoure-tariff/resoure-tariff.entity';
import { requiredField, checkLength } from 'src/app/_helpers';

export class ResoureTariffForm extends FormModel {

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

    constructor(resoureTariffEntity?: ResoureTariffEntity) {
        super();
        if (resoureTariffEntity !== null && resoureTariffEntity !== undefined) {
            Object.keys(resoureTariffEntity).forEach((item) => {
                if (resoureTariffEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
                    this[item].setValue(resoureTariffEntity[item]);
                }
            });
        }
    }
}
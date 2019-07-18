import { FormModel } from './../../../../_helpers/form-model';
import { FormControl, Validators, FormGroup, AbstractControl, RequiredValidator, FormArray } from '@angular/forms';
import { SobEntity } from 'src/app/_modules/master-data/_backend/sob/sob.entity';
import { requiredField, checkLength } from 'src/app/_helpers';

export class SobForm extends FormModel {
    code = new FormControl('', [requiredField]);
    name = new FormControl('', [requiredField]);

    //he thong tai khoan ke toan
    coaId = new FormControl('');
    coaName = new FormControl('');

    //don vi tien te
    currencyId = new FormControl('', [requiredField]);
    currencyName = new FormControl('', [requiredField]);

    //bieu thue tieu thu dac biet
    sctId = new FormControl('');
    sctName = new FormControl('');

    //bieu thue gia tri gia tang
    vatId = new FormControl('');
    vatName = new FormControl('');

    //bieu thue tai nguyen
    nrtId = new FormControl('');
    nrtName = new FormControl('');


    //bieu thue moi truong
    entId = new FormControl('');
    entName = new FormControl('');


    //bieu thue xuat khau
    extId = new FormControl('');
    extName = new FormControl('');

    //bieu thue nhap khau
    imtId = new FormControl('');
    imtName = new FormControl('');


    constructor(sobEntity?: SobEntity) {
        super();
    }
}
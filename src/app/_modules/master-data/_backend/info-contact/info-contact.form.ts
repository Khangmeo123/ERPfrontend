import { FormControl, Validators, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { requiredField, checkLength } from 'src/app/_helpers';
import { FormModel } from 'src/app/_helpers/form-model';
import { InfoContactEntity } from './info-contact.entity';


export class InfoContactForm extends FormModel {
    name = new FormControl('', [requiredField]);
    phone = new FormControl('', [requiredField]);
    email = new FormControl('');
    address = new FormControl('');
    provinceId = new FormControl('');
    provinceName = new FormControl('');
    constructor(infoContactEntity?: InfoContactEntity) {
        super();
        if (infoContactEntity !== null && infoContactEntity !== undefined) {
            Object.keys(infoContactEntity).forEach((item) => {
                if (infoContactEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
                    this[item].setValue(infoContactEntity[item]);
                }
            });
        }
    }
}
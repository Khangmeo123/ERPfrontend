import { FormControl, Validators, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { requiredField, checkLength } from 'src/app/_helpers';
import { FormModel } from 'src/app/_helpers/form-model';
import { InfoContactEntity } from './info-contact.entity';


export class InfoContactForm extends FormModel {
    name = new FormControl('', [requiredField]);
    phone = new FormControl('', [requiredField]);
    email = new FormControl('', [requiredField]);
    address: string;
    relationship: string;
    constructor(infoContactEntity?: InfoContactEntity) {
        super(infoContactEntity);
    }
}
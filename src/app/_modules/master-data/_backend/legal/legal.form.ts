import { FormControl, Validators, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { requiredField, checkLength } from 'src/app/_helpers';
import { LegalEntity } from './legal.entity';
import { FormModel } from 'src/app/_helpers/form-model';


export class LegalForm extends FormModel {
    name = new FormControl('', [requiredField, checkLength(1, 50)]);
    code = new FormControl('', [requiredField, checkLength(2, 2)]);
    setOfBookId = new FormControl('', [requiredField]);
    errors = new FormGroup({
        name: new FormControl(''),
        code: new FormControl(''),
        setOfBookId: new FormControl('')
    });

    constructor(legalEntity?: LegalEntity) {
        super();
        if (legalEntity !== null && legalEntity !== undefined) {
            Object.keys(legalEntity).forEach((item) => {
                if (legalEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
                    this[item].patchValue(legalEntity[item]);
                }
            });
        }
    }
}
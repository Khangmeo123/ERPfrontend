import { FormModel } from './../../../../_helpers/form-model';
import { FormControl, Validators, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { requiredField, checkLength } from 'src/app/_helpers';
import { UomEntity } from './uom.entity';

export class UomForm extends FormModel {
    name = new FormControl('', [requiredField, checkLength(1, 500)]);
    code = new FormControl('', [requiredField, checkLength(3, 10)]);
    description = new FormControl('', [checkLength(0, 1000)]);
    errors = new FormGroup({
        name: new FormControl(),
        code: new FormControl(),
        description: new FormControl()
    })
    constructor(uomEntity?: UomEntity) {
        super();
        this.mapData(uomEntity);
    }
}
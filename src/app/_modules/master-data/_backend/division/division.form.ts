import { FormModel } from '../../../../_helpers/form-model';
import { FormControl, FormGroup } from '@angular/forms';
import { requiredField, checkLength } from 'src/app/_helpers';
import { DivisionEntity } from './division.entity';


export class DivisionForm extends FormModel {
    name = new FormControl('', [requiredField, checkLength(1, 50)]);
    code = new FormControl('', [requiredField, checkLength(1, 3)]);
    address = new FormControl('');
    legalEntityId = new FormControl();


    errors = new FormGroup({
        name: new FormControl(''),
        code: new FormControl(''),
    })

    constructor(divisionEntity?: DivisionEntity) {
        super();
        if (divisionEntity !== null && divisionEntity !== undefined) {
            Object.keys(divisionEntity).forEach((item) => {
                if (divisionEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
                    this[item].patchValue(divisionEntity[item]);
                }
            });
        }
    }
}
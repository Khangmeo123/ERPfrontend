import { FormModel } from '../../../../_helpers/form-model';
import { FormControl } from '@angular/forms';
import { requiredField, checkLength } from 'src/app/_helpers';
import { DivisionEntity } from './divisionl.entity';


export class DivisionForm extends FormModel {
    name = new FormControl('', [requiredField, checkLength(3, 50)]);
    code = new FormControl('', [requiredField, checkLength(3, 10)]);
    address = new FormControl();

    constructor(divisionEntity?: DivisionEntity) {
        super();
    }
}
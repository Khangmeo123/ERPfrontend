import { FormModel } from './../../../../_helpers/form-model';
import { FormControl, Validators, FormGroup, AbstractControl, RequiredValidator, FormArray } from '@angular/forms';
import { CostCenterEntity } from 'src/app/_modules/master-data/_backend/cost-center/cost-center.entity';
import { requiredField, checkLength } from 'src/app/_helpers';

export class CostCenterForm extends FormModel {

    name = new FormControl('', [requiredField]);
    code = new FormControl('', [requiredField]);

    formValid = new FormControl('');
    toValid = new FormControl('');

    coaId = new FormControl('');
    coaAccountNumber = new FormControl('');

    description = new FormControl('');

    constructor(costCenterEntity?: CostCenterEntity) {
        super();
    }
}
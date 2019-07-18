import { FormModel } from './../../../../_helpers/form-model';
import { FormControl, Validators, FormGroup, AbstractControl, RequiredValidator, FormArray } from '@angular/forms';
import { requiredField, checkLength } from 'src/app/_helpers';
import { FiscalYearEntity } from './fiscal-year.entity';

export class FiscalYearForm extends FormModel {

    name = new FormControl('', [requiredField]);
    code = new FormControl('', [requiredField]);

    formValid = new FormControl('', [requiredField]);
    toValid = new FormControl('', [requiredField]);

    valuationMethodId = new FormControl('', [requiredField]);
    valuationMethodName = new FormControl('', [requiredField]);

    statusId = new FormControl('', [requiredField]);
    statusName = new FormControl('', [requiredField]);

    constructor(fiscalYearEntity?: FiscalYearEntity) {
        super();
    }
}
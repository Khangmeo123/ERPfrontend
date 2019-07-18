import { FormModel } from './../../../../_helpers/form-model';
import { FormControl, Validators, FormGroup, AbstractControl, RequiredValidator, FormArray } from '@angular/forms';
import { CoaEntity } from 'src/app/_modules/master-data/_backend/coa/coa.entity';
import { requiredField, checkLength } from 'src/app/_helpers';

export class CoaForm extends FormModel {

    accountNumber = new FormControl('', [requiredField]);
    accountName = new FormControl('', [requiredField]);


    propertyId = new FormControl('');
    propertyName = new FormControl('');


    coaParentId = new FormControl('');
    coaParentAccountNumber = new FormControl('');

    description = new FormControl('');

    constructor(coaEntity?: CoaEntity) {
        super();
    }
}
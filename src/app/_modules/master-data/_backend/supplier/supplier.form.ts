import { FormControl, Validators, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { requiredField, checkLength } from 'src/app/_helpers';
import { FormModel } from 'src/app/_helpers/form-model';


export class SupplierForm extends FormModel {
    code = new FormControl('', [requiredField]);
    name = new FormControl('', [requiredField]);
    taxNumber = new FormControl();
    note = new FormControl();

    // statusEntity
    statusId = new FormControl('', [requiredField]);
    statusName = new FormControl('', [requiredField]);

    infoContacts = new FormArray([]);
    bankAccounts = new FormArray([]);
    constructor(supplierForm?: SupplierForm) {
        super(supplierForm);
    }
}
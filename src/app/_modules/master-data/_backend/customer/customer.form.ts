import { CustomerEntity } from './customer.entity';
import { FormControl, Validators, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { requiredField, checkLength } from 'src/app/_helpers';
import { FormModel } from 'src/app/_helpers/form-model';


export class CustomerForm extends FormModel {
    code = new FormControl('', [requiredField]);
    name = new FormControl('', [requiredField, checkLength(3, 100)]);
    taxCode = new FormControl();
    note = new FormControl();
    customerGroupingId = new FormControl();

    // statusEntity
    statusId = new FormControl('', [requiredField]);
    statusName = new FormControl('');

    infoContacts = new FormArray([]);
    bankAccounts = new FormArray([]);
    errors = new FormGroup({
        code: new FormControl(),
        name: new FormControl(),
        statusId: new FormControl(),
    });
    constructor(customerEntity?: CustomerEntity) {
        super();
        this.mapData(customerEntity);
    }
}
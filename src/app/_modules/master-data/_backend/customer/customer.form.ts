import { CustomerEntity } from './customer.entity';
import { FormControl, Validators, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { requiredField, checkLength } from 'src/app/_helpers';
import { FormModel } from 'src/app/_helpers/form-model';


export class CustomerForm extends FormModel {
    code = new FormControl('', [requiredField]);
    name = new FormControl('', [requiredField]);
    taxNumber = new FormControl();
    note = new FormControl();

    // statusEntity
    statusId = new FormControl('', [requiredField]);
    statusName = new FormControl('', [requiredField]);

    infoContacts = new FormArray([]);
    bankAccounts = new FormArray([]);
    constructor(customerEntity?: CustomerEntity) {
        super();
        if (customerEntity !== null && customerEntity !== undefined) {
            Object.keys(customerEntity).forEach((item) => {
                if (customerEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
                    this[item].setValue(customerEntity[item]);
                }
            });
        }
    }
}
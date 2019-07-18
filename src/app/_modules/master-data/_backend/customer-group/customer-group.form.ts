import { FormControl, Validators, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { requiredField, checkLength } from 'src/app/_helpers';
import { CustomerGroupEntity } from './customer-group.entity';
import { FormModel } from 'src/app/_helpers/form-model';


export class CustomerGroupForm extends FormModel {

    name = new FormControl('', [requiredField]);
    code = new FormControl('', [requiredField]);

    description = new FormControl('');

    constructor(customerGroupEntity?: CustomerGroupEntity) {
        super();
        if (customerGroupEntity !== null && customerGroupEntity !== undefined) {
            Object.keys(customerGroupEntity).forEach((item) => {
                if (customerGroupEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
                    this[item].setValue(customerGroupEntity[item]);
                }
            });
        }
    }
}
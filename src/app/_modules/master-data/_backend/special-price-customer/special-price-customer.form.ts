import { FormControl, Validators, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { requiredField, checkLength } from 'src/app/_helpers';
import { SpecialPriceCustomerEntity } from './special-price-customer.entity';
import { FormModel } from 'src/app/_helpers/form-model';


export class SpecialPriceCustomerForm extends FormModel {
    itemGroupId = new FormControl('', [requiredField]);
    itemGroupName = new FormControl('', [requiredField]);

    itemId = new FormControl('');
    itemName = new FormControl('');

    fromValid = new FormControl('');
    toValid = new FormControl('');

    discount = new FormControl('');
    description = new FormControl('');

    constructor(specialPriceCustomerEntity?: SpecialPriceCustomerEntity) {
        super();
        if (specialPriceCustomerEntity !== null && specialPriceCustomerEntity !== undefined) {
            Object.keys(specialPriceCustomerEntity).forEach((item) => {
                if (specialPriceCustomerEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
                    this[item].setValue(specialPriceCustomerEntity[item]);
                }
            });
        }
    }
}
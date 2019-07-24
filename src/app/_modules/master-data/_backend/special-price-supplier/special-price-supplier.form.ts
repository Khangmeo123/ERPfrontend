import { FormControl, Validators, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { requiredField, checkLength } from 'src/app/_helpers';
import { SpecialPriceSupplierEntity } from './special-price-supplier.entity';
import { FormModel } from 'src/app/_helpers/form-model';


export class SpecialPriceSupplierForm extends FormModel {
    itemGroupId = new FormControl('', [requiredField]);
    itemGroupName = new FormControl('', [requiredField]);

    itemId = new FormControl('');
    itemName = new FormControl('');

    fromValid = new FormControl('');
    toValid = new FormControl('');

    discount = new FormControl('');
    description = new FormControl('');

    constructor(specialPriceSupplierEntity?: SpecialPriceSupplierEntity) {
        super();
        if (specialPriceSupplierEntity !== null && specialPriceSupplierEntity !== undefined) {
            Object.keys(specialPriceSupplierEntity).forEach((item) => {
                if (specialPriceSupplierEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
                    this[item].setValue(specialPriceSupplierEntity[item]);
                }
            });
        }
    }
}
import { FormControl, Validators, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { requiredField, checkLength } from 'src/app/_helpers';
import { SpecialPriceSupplierEntity } from './special-price-supplier.entity';
import { FormModel } from 'src/app/_helpers/form-model';


export class SpecialPriceSupplierForm extends FormModel{
    productGroupId = new FormControl('',[requiredField]);
    productGroupName = new FormControl('',[requiredField]);

    productId = new FormControl('');
    productName = new FormControl('');

    fromValid = new FormControl('');
    toValid = new FormControl('');

    discount = new FormControl('');
    description = new FormControl('');

    constructor(specialPriceSupplierEntity?: SpecialPriceSupplierEntity) {
       super(specialPriceSupplierEntity);
    }
}
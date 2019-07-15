import { FormModel } from './../../../../_helpers/form-model';
import { FormControl, Validators, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { requiredField, checkLength } from 'src/app/_helpers';
import { ProductEntity } from './product.entity';


export class ProductForm extends FormModel {

    constructor(productEntity?: ProductEntity) {
        super(productEntity);
    }
}
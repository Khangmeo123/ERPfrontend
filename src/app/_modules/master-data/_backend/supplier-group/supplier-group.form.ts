import { FormControl, Validators, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { requiredField, checkLength } from 'src/app/_helpers';
import { SupplierGroupEntity } from './supplier-group.entity';
import { FormModel } from 'src/app/_helpers/form-model';


export class SupplierGroupForm extends FormModel {

    name = new FormControl('', [requiredField]);
    code = new FormControl('', [requiredField]);

    description = new FormControl('');

    constructor(supplierGroupEntity?: SupplierGroupEntity) {
        super();
        if (supplierGroupEntity !== null && supplierGroupEntity !== undefined) {
            Object.keys(supplierGroupEntity).forEach((item) => {
                if (supplierGroupEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
                    this[item].setValue(supplierGroupEntity[item]);
                }
            });
        }
    }
}
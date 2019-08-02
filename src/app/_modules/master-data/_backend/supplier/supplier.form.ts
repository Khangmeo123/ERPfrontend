import { SupplierEntity } from './supplier.entity';
import { FormControl, Validators, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { requiredField, checkLength } from 'src/app/_helpers';
import { FormModel } from 'src/app/_helpers/form-model';


export class SupplierForm extends FormModel {
    code = new FormControl('', [requiredField]);
    name = new FormControl('', [requiredField, checkLength(3, 100)]);
    taxCode = new FormControl();
    note = new FormControl();

    // status
    statusId = new FormControl('', [requiredField]);
    statusName = new FormControl('');

    errors = new FormGroup({
        code: new FormControl(),
        name: new FormControl(),
        statusId: new FormControl(),
    });

    constructor(supplierEntity?: SupplierEntity) {
        super();
        this.mapData(supplierEntity);
    }
}
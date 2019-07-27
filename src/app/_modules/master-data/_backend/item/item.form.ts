import { FormModel } from './../../../../_helpers/form-model';
import { FormControl, Validators, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { requiredField, checkLength } from 'src/app/_helpers';
import { ItemEntity } from './item.entity';


export class ItemForm extends FormModel {
    code = new FormControl('', [requiredField, checkLength(3, 10)]);
    codeFromSupplier = new FormControl('', [checkLength(0, 500)]);
    codeFromMarket = new FormControl('', [checkLength(0, 500)]);
    name = new FormControl('', [requiredField]);

    // characteristicEntity:
    characteristicName = new FormControl('', [requiredField]);
    characteristicId = new FormControl('', [requiredField]);

    // unitEntity:
    uomName = new FormControl('', [requiredField]);
    uomId = new FormControl('');

    primaryPrice = new FormControl('', [requiredField]);
    weight = new FormControl('');

    // statusEntity:
    statusName = new FormControl('');
    statusId = new FormControl('', [requiredField]);

    height = new FormControl('');
    length = new FormControl('');
    width = new FormControl('');
    img = new FormControl('');
    description = new FormControl('');

    errors = new FormGroup({
        code: new FormControl(''),
        name: new FormControl(''),
        primaryPrice: new FormControl(''),
        propertyId: new FormControl(''),
        uomId: new FormControl(''),
        statusId: new FormControl(''),
    });

    constructor(itemEntity?: ItemEntity) {
        super();
        this.mapData(itemEntity);
    }
}

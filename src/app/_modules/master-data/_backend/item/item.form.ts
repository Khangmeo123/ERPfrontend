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
    characteristicDisplay = new FormControl('');
    characteristicId = new FormControl('', [requiredField]);

    // unitEntity:
    unitOfMeasureName = new FormControl('');
    unitOfMeasureId = new FormControl('', [requiredField]);

    primaryPrice = new FormControl('', [requiredField]);
    weight = new FormControl('');

    // statusEntity:
    statusDisplay = new FormControl('');
    statusId = new FormControl('', [requiredField]);

    height = new FormControl('');
    length = new FormControl('');
    width = new FormControl('');
    image = new FormControl('');
    description = new FormControl('');

    errors = new FormGroup({
        code: new FormControl(''),
        name: new FormControl(''),
        primaryPrice: new FormControl(''),
        characteristicId: new FormControl(''),
        uomId: new FormControl(''),
        statusId: new FormControl(''),
    });

    constructor(itemEntity?: ItemEntity) {
        super();
        this.mapData(itemEntity);
    }
}

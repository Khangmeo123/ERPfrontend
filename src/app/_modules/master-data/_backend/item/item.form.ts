import { FormModel } from './../../../../_helpers/form-model';
import { FormControl, Validators, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { requiredField, checkLength } from 'src/app/_helpers';
import { ItemEntity } from './item.entity';


export class ItemForm extends FormModel {
    code = new FormControl('', [requiredField]);
    codeFromSupplier = new FormControl('');
    codeFromMarket = new FormControl('');
    name = new FormControl('', [requiredField]);

    // characteristicEntity:
    characteristicName = new FormControl('', [requiredField]);
    characteristicId = new FormControl('', [requiredField]);

    // unitEntity:
    uomName = new FormControl('', [requiredField]);
    uomId = new FormControl('', [requiredField]);

    primaryPrice = new FormControl('', [requiredField]);
    weight = new FormControl('');

    // statusEntity:
    statusName = new FormControl('', [requiredField]);
    statusId = new FormControl('', [requiredField]);

    height = new FormControl('');
    length = new FormControl('');
    width = new FormControl('');
    img = new FormControl('');
    description = new FormControl('');

    // vatEntity:
    vatId = new FormControl('');
    vatCode = new FormControl('');
    vatName = new FormControl('');
    vatValue = new FormControl('');

    // nrtEntity:
    nrtId = new FormControl('');
    nrtCode = new FormControl('');
    nrtName = new FormControl('');
    nrtValue = new FormControl('');

    // entEntity:
    entId = new FormControl('');
    entCode = new FormControl('');
    entName = new FormControl('');
    entValue = new FormControl('');

    // imtEntity:
    imtId = new FormControl('');
    imtCode = new FormControl('');
    imtName = new FormControl('');
    imtValue = new FormControl('');

    // extEntity:
    extId = new FormControl('');
    extCode = new FormControl('');
    extName = new FormControl('');
    extValue = new FormControl('');

    // sctEntity;
    sctId = new FormControl('');
    sctCode = new FormControl('');
    sctName = new FormControl('');
    sctValue = new FormControl('');

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

import { FormModel } from '../../../../_helpers/form-model';
import { FormControl, Validators, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { requiredField, checkLength } from 'src/app/_helpers';
import { AssetEntity } from './asset.entity';


export class AssetForm extends FormModel {
    name = new FormControl('', [requiredField, checkLength(1, 500)]);
    code = new FormControl('', [requiredField]);
    // typeEntity:
    typeId = new FormControl('', [requiredField]);
    typeName = new FormControl('');
    // statusEntity:
    statusId = new FormControl('', [requiredField]);
    statusDisplay = new FormControl('');
    errors = new FormGroup({
        name: new FormControl(''),
        code: new FormControl(''),
        typeId: new FormControl(''),
        statusId: new FormControl('')
    });
    constructor(assetEntity?: AssetEntity) {
        super();
        this.mapData(assetEntity);
    }
}

import { FormModel } from './../../../../_helpers/form-model';
import { FormControl, Validators, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { requiredField, checkLength } from 'src/app/_helpers';
import { AssetEntity } from './asset.entity';


export class AssetForm extends FormModel {
    name = new FormControl('', [requiredField]);
    code = new FormControl('', [requiredField]);
    // typeEntity:
    typeId = new FormControl('', [requiredField]);
    typeName = new FormControl('', [requiredField]);
    // statusEntity:
    statusId = new FormControl('', [requiredField]);
    statusName = new FormControl('', [requiredField]);

    constructor(assetEntity?: AssetEntity) {
        super();
        if (assetEntity !== null && assetEntity !== undefined) {
            Object.keys(assetEntity).forEach((item) => {
                if (assetEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
                    this[item].setValue(assetEntity[item]);
                }
            });
        }
    }
}
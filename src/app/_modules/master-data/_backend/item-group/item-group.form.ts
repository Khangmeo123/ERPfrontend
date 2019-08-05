import { FormControl, Validators, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { requiredField, checkLength } from 'src/app/_helpers';
import { ItemGroupEntity } from './item-group.entity';
import { FormModel } from 'src/app/_helpers/form-model';


export class ItemGroupForm extends FormModel {

    name = new FormControl('', [requiredField]);
    code = new FormControl('', [requiredField]);
    legalEntityId = new FormControl('');
    description = new FormControl('');
    errors = new FormGroup({
        name: new FormControl(''),
        code: new FormControl('')
    });
    constructor(itemGroupEntity?: ItemGroupEntity) {
        super();
        if (itemGroupEntity !== null && itemGroupEntity !== undefined) {
            Object.keys(itemGroupEntity).forEach((item) => {
                if (itemGroupEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
                    this[item].patchValue(itemGroupEntity[item]);
                }
            });
        }
    }
}
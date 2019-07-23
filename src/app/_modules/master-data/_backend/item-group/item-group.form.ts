import { FormControl, Validators, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { requiredField, checkLength } from 'src/app/_helpers';
import { ItemGroupEntity } from './item-group.entity';
import { FormModel } from 'src/app/_helpers/form-model';


export class ItemGroupForm extends FormModel {

    name = new FormControl('', [requiredField]);
    code = new FormControl('', [requiredField]);

    description = new FormControl('');

    constructor(itemGroupEntity?: ItemGroupEntity) {
        super();
        if (itemGroupEntity !== null && itemGroupEntity !== undefined) {
            Object.keys(itemGroupEntity).forEach((item) => {
                if (itemGroupEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
                    this[item].setValue(itemGroupEntity[item]);
                }
            });
        }
    }
}
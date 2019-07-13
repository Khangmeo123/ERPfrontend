import { Entity } from './entity';
import { FormGroup, FormControl } from '@angular/forms';

export class FormModel {
    isDelete = new FormControl();
    isEdit = new FormControl();
    error = new FormGroup({});
    constructor(entity: any) {
        if (entity !== null && entity !== undefined) {
            Object.keys(Entity).forEach((item) => {
                if (Entity.hasOwnProperty(item)) {
                    this[item].setValue(Entity[item]);
                }
            });
        }
    }
}
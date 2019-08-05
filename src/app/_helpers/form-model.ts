import { Entity } from './entity';
import { FormGroup, FormControl } from '@angular/forms';

export class FormModel {
    id = new FormControl();
    isDeleted = new FormControl(false);
    isEdited = new FormControl();
    constructor() {
    }

    mapData(entity?: any) {
        if (entity !== null && entity !== undefined) {
            Object.keys(entity).forEach((item) => {
                if (entity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
                    if (entity[item] && typeof entity[item] === 'object' && entity[item].constructor === Array) {
                        entity[item].forEach(element => {
                            const formGroup = new FormGroup({});
                            Object.keys(element).forEach(result => {
                                formGroup.addControl(result, new FormControl(''));
                            });
                            this[item].push(formGroup);
                        });
                    } else {
                        this[item].patchValue(entity[item]);
                    }
                }
            });
        }
    }
}
import { Entity } from './entity';
import { FormGroup, FormControl } from '@angular/forms';

export class FormModel {
    id = new FormControl();
    isDeleted = new FormControl(false);
    isEdited = new FormControl();
    errors = new FormGroup({});
    constructor() {
    }
}
import { FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms'
import { UserEntity } from './../../../_backend/user/user.entity';
import { requiredField } from './../../../../../_helpers';

export class UserForm {
    Name = new FormControl();
    Display = new FormControl();
    Error = new FormGroup({});

    constructor(user?: UserEntity) {
        if (user !== null && user !== undefined) {
            if (user.Name) {
                this.Name.setValue(user.Name);
                this.Name.setValidators(requiredField);
            }
            if (user.Display) {
                this.Display.setValue(user.Display);
            }

        }
        this.Error.addControl('Name', new FormControl('Error'));
    }
}
import { FormControl } from '@angular/forms'
import { UserEntity } from './../../../_backend/user/user.entity';

export class UserForm {
    Name = new FormControl();
    Display = new FormControl();
    
    constructor(user?: UserEntity) {
        if(user !== null && user !== undefined){
            if (user.Name) {
                this.Name.setValue(user.Name)
            }
            if (user.Display) {
                this.Display.setValue(user.Display)
            }
        }
    }
}
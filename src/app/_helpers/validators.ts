import { AbstractControl } from '@angular/forms';


export function requiredField(c: AbstractControl) {
    return (c.value == null || c.value.length === 0) ? {
        invalidusername: true,
        message: 'Name must be requried!',
    } : null;
}
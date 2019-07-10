import {AbstractControl} from '@angular/forms';


export function requiredField(c: AbstractControl) {
  return (c.value == null || c.value.length === 0) ? {
    invalidUsername: 'Name must be required!',
  } : null;
}

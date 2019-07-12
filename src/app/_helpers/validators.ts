import { AbstractControl } from '@angular/forms';


export function requiredField(c: AbstractControl) {
  return (c.value == null || c.value.length === 0) ? {
    invalidUsername: 'Name must be required!',
  } : null;
}

export function dateField(control: AbstractControl) {
  return /((0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/([12]\d{3}))/.test(control.value)
    ? null
    : {
      invalidDate: `Invalid date`,
    };
}


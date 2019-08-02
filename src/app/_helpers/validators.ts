import { AbstractControl } from '@angular/forms';


export const requiredField = (c: AbstractControl) =>
  (c.value == null || c.value.length === 0)
    ? {
      invalidRequired: 'Field must be required!',
    }
    : null;

export function dateField(control: AbstractControl) {
  return /((0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/([12]\d{3}))/.test(control.value)
    ? null
    : {
      invalidDate: `Invalid date`,
    };
}

export function checkLength(from = 1, to = 100) {
  return (c: AbstractControl) => {
    return (c.value && (c.value.length > to || c.value.length < from)) ? {
      invalidLength: 'Field length must in range ' + '[' + from + ' ,' + to + ']',
    } : null;
  };
}

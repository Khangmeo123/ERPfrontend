import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Howl, Howler } from 'howler';
@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  private sound = new Howl({
    src: ['/assets/sound/alert.mp3'],
    html5: true,
    volume: 1,
  });

  constructor() { }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  toNumber(value: string) {
    return Number(value);
  }

  alertSound() {
    this.sound.play();
  }
}

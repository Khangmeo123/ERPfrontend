import { translate } from 'src/app/_helpers/string';
import { Pipe } from '@angular/core';

@Pipe({ name: 'gender' })

export class Gender {
  constructor() { }
  transform(gender) {
    const male = translate('general.gender.male');
    const female = translate('general.gender.female');
    return gender ? male : female;
  }
}

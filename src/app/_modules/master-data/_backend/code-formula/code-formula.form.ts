import {FormModel} from '../../../../_helpers/form-model';
import {SplitRuleEntity} from './code-formula.entity';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {requiredField} from '../../../../_helpers';

export class CodeFormulaForm extends FormModel {
  id: FormControl = new FormControl();

  code: FormControl = new FormControl(null, [
    requiredField,
  ]);

  legalEntityId: FormControl = new FormControl(null, [
    requiredField,
  ]);

  length: FormControl = new FormControl(null, [
    requiredField,
  ]);

  identifierStringStart: FormControl = new FormControl(null, [
    requiredField,
  ]);

  identifierStringEnd: FormControl = new FormControl(null, [
    requiredField,
  ]);

  identifierStringValues: FormControl = new FormControl(null, [
    requiredField,
  ]);

  itemDetails: FormArray = new FormArray([]);

  splitRuleContents: FormArray = new FormArray([]);

  errors: FormGroup = new FormGroup({
    code: new FormControl(),
    length: new FormControl(),
    identifierStringStart: new FormControl(),
    identifierStringEnd: new FormControl(),
    identifierStringValues: new FormControl(),
  });

  constructor(entity?: SplitRuleEntity) {
    super();
    this.mapData(entity);
  }
}

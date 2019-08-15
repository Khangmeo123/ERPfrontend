import {Entity} from '../../../../_helpers/entity';
import {FormModel} from '../../../../_helpers/form-model';
import {FormControl} from '@angular/forms';
import {requiredField} from '../../../../_helpers';
import {SearchEntity} from '../../../../_helpers/search-entity';
import {TextFilter} from '../../../../_shared/models/filters/TextFilter';

export class PermissionEntity extends Entity {
  id: string;

  positionCode: string;

  positionName: string;

  currentStep: string;

  currentStatus: string;

  nextStep: string;

  nextStatus: string;

  disabled: boolean;

  constructor(permissionEntity?: PermissionEntity) {
    super(permissionEntity);
  }
}

export class PermissionForm extends FormModel {
  id: FormControl = new FormControl(null);

  positionCode: FormControl = new FormControl(null, [
    requiredField,
  ]);

  positionName: FormControl = new FormControl(null, [
    requiredField,
  ]);

  currentStep: FormControl = new FormControl(null, [
    requiredField,
  ]);

  currentStatus: FormControl = new FormControl(null, [
    requiredField,
  ]);

  nextStep: FormControl = new FormControl(null, [
    requiredField,
  ]);

  nextStatus: FormControl = new FormControl(null, [
    requiredField,
  ]);

  disabled: FormControl = new FormControl(null);

  constructor(permissionEntity?: PermissionEntity) {
    super();
    this.mapData(permissionEntity);
  }
}

export class PermissionSearchEntity extends SearchEntity {

  positionCode: string;

  positionName: TextFilter = new TextFilter();

  currentStep: TextFilter = new TextFilter();

  currentStatus: string;

  nextStep: TextFilter = new TextFilter();

  nextStatus: string;

  disabled: boolean;
}

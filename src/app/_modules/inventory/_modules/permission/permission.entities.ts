import {Entity} from '../../../../_helpers/entity';
import {FormModel} from '../../../../_helpers/form-model';
import {FormControl} from '@angular/forms';
import {requiredField} from '../../../../_helpers';
import {SearchEntity} from '../../../../_helpers/search-entity';
import {TextFilter} from '../../../../_shared/models/filters/TextFilter';
import {NumberFilter} from '../../../../_shared/models/filters/NumberFilter';

export class PermissionEntity extends Entity {
  id: string;

  positionId: string;

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

  legalEntityId: FormControl = new FormControl(null, [
    requiredField,
  ]);

  inventoryOrganizationId: FormControl = new FormControl(null, [
    requiredField,
  ]);

  inventoryDocumentTypeId: FormControl = new FormControl(null, [
    requiredField,
  ]);

  inventoryDocumentTypeDisplay: FormControl = new FormControl(null);

  positionId: FormControl = new FormControl(null);

  positionCode: FormControl = new FormControl(null);

  positionName: FormControl = new FormControl(null);

  currentStep: FormControl = new FormControl(null, [
    requiredField,
  ]);

  nextStep: FormControl = new FormControl(null, [
    requiredField,
  ]);

  currentStatusId: FormControl = new FormControl(null, [
    requiredField,
  ]);
  currentStatusDisplay: FormControl = new FormControl(null);

  nextStatusId: FormControl = new FormControl(null, [
    requiredField,
  ]);
  nextStatusDisplay: FormControl = new FormControl(null);

  disabled: FormControl = new FormControl(null);

  mailToSender: FormControl = new FormControl(null);

  mailToApprover: FormControl = new FormControl(null);

  constructor(permissionEntity?: PermissionEntity) {
    super();
    this.mapData(permissionEntity);
  }
}

export class PermissionSearchEntity extends SearchEntity {
  legalEntityId: string;

  inventoryOrganizationId: string;

  inventoryDocumentTypeId: string;

  positionCode: TextFilter = new TextFilter();

  positionName: TextFilter = new TextFilter();

  currentStep: NumberFilter = new NumberFilter();

  currentStatusId: string;

  currentStatusDisplay: string;

  nextStep: NumberFilter = new NumberFilter();

  nextStatusId: string;

  nextStatusDisplay: string;

  disabled: boolean;
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Subject, Subscription} from 'rxjs';
import {PermissionDetailService} from './permission-detail.service';
import {PositionEntity} from '../../../_backend/position/position.entity';
import {Entities, EnumEntity} from '../../../../../_helpers/entity';
import {PositionSearchEntity} from '../../../_backend/position/position.search-entity';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {translate} from '../../../../../_helpers/string';
import {GeneralService} from '../../../../../_helpers/general-service.service';

@Component({
  selector: 'app-permission-detail',
  templateUrl: './permission-detail.component.html',
  styleUrls: ['./permission-detail.component.scss'],
  providers: [
    PermissionDetailService,
    ToastrService,
    GeneralService,
  ],
})
export class PermissionDetailComponent implements OnInit, OnDestroy {

  isBookMark: boolean = false;

  permissionForm: FormGroup;

  subscription: Subscription = new Subscription();

  legalEntityId: string = null;

  inventoryDocumentTypeId: string = null;

  inventoryOrganizationId: string = null;

  documentStatus: EnumEntity[] = [];

  /**
   * Select position
   */
  position: PositionEntity = null;
  positionEntities: Entities = new Entities();
  positionSearchEntity: PositionSearchEntity = new PositionSearchEntity();
  positionSearchEntityTyping: Subject<PositionSearchEntity> = new Subject<PositionSearchEntity>();

  constructor(
    private permissionDetailService: PermissionDetailService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private generalService: GeneralService,
    private router: Router,
  ) {
    const permissionFormSub: Subscription = this.permissionDetailService.permissionForm.subscribe((form: FormGroup) => {
      this.permissionForm = form;
      if (form.value.id) {
        this.positionSearchEntity.ids = [
          form.value.positionId,
        ];
      }
      this.patchIds();
    });

    const positionTypingSub: Subscription = this.permissionDetailService.searchPositionByTyping(this.positionSearchEntityTyping);
    const positionSub: Subscription = this.permissionDetailService.positionList.subscribe((entities: Entities) => {
      this.positionEntities = entities;
    });

    const routeSub: Subscription = this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params.legalEntityId && params.inventoryDocumentTypeId && params.inventoryOrganizationId) {
        this.legalEntityId = params.legalEntityId;
        this.inventoryDocumentTypeId = params.inventoryDocumentTypeId;
        this.inventoryOrganizationId = params.inventoryOrganizationId;
        this.patchIds();
        if (params.id) {
          this.permissionDetailService.get(params.id)
            .then(() => {
            });
        }
      } else {
        this.toastrService.error(translate('permission.detail.params.get.error'));
      }
    });

    const documentStatusSub: Subscription = this.permissionDetailService.documentStatus.subscribe((status: EnumEntity[]) => {
      if (status) {
        this.documentStatus = status;
      }
    });

    this.subscription
      .add(permissionFormSub)
      .add(positionTypingSub)
      .add(positionSub)
      .add(routeSub)
      .add(documentStatusSub);
  }

  get errors() {
    return this.permissionForm.get('errors') as FormGroup;
  }

  get positionCode() {
    return this.permissionForm.get('positionCode') as FormControl;
  }

  get positionName() {
    return this.permissionForm.get('positionName') as FormControl;
  }

  get currentStep() {
    return this.permissionForm.get('currentStep') as FormControl;
  }

  get nextStep() {
    return this.permissionForm.get('nextStep') as FormControl;
  }

  get positionId() {
    return this.permissionForm.get('positionId') as FormControl;
  }

  get currentStatusId() {
    return this.permissionForm.get('currentStatusId') as FormControl;
  }

  get nextStatusId() {
    return this.permissionForm.get('nextStatusId') as FormControl;
  }

  get currentStatusDisplay() {
    return this.permissionForm.get('currentStatusDisplay') as FormControl;
  }

  get nextStatusDisplay() {
    return this.permissionForm.get('nextStatusDisplay') as FormControl;
  }

  patchIds() {
    this.permissionForm.patchValue({
      inventoryDocumentTypeId: this.inventoryDocumentTypeId,
      inventoryOrganizationId: this.inventoryOrganizationId,
      legalEntityId: this.legalEntityId,
    });
  }

  onSelectCurrentStatus(event) {
    if (event) {
      this.currentStatusId.setValue(event.id);
      this.currentStatusDisplay.setValue(event.display);
    }
  }

  onSelectNextStatus(event) {
    if (event) {
      this.nextStatusId.setValue(event.id);
      this.nextStatusDisplay.setValue(event.display);
    }
  }

  nodeSelector = node => node;

  ngOnInit() {
    return this.getDocumentStatus();
  }

  getDocumentStatus() {
    return this.permissionDetailService.getDocumentStatus(this.inventoryDocumentTypeId);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  bookMark() {
  }

  getPositionList() {
    if (this.legalEntityId) {
      const {ids} = this.positionSearchEntity;
      this.positionSearchEntity = new PositionSearchEntity();
      this.positionSearchEntity.ids = ids;
      this.positionSearchEntity.legalEntityId = this.legalEntityId;
      return this.permissionDetailService.getPositionList(this.positionSearchEntity);
    }
  }

  onSearchPosition(event) {
    const {ids} = this.positionSearchEntity;
    this.positionSearchEntity = new PositionSearchEntity();
    this.positionSearchEntity.ids = ids;
    this.positionSearchEntity.name.startsWith = event;
    this.positionSearchEntityTyping.next(this.positionSearchEntity);
  }

  onSelectPosition(event) {
    if (event && event.length) {
      const positionEntity: PositionEntity = event[0];
      this.positionId.setValue(positionEntity.id);
      this.positionCode.setValue(positionEntity.code);
      this.positionName.setValue(positionEntity.name);
      this.positionSearchEntity.ids = [
        positionEntity.id,
      ];
    }
  }

  cancel() {
    return this.router.navigate(
      ['/inventory/permission/permission-list'],
      {
        queryParams: {
          legalEntityId: this.legalEntityId,
          inventoryOrganizationId: this.inventoryOrganizationId,
          inventoryDocumentTypeId: this.inventoryDocumentTypeId,
        },
      },
    );
  }

  save() {
    if (this.permissionForm.invalid) {
      this.generalService.validateAllFormFields(this.permissionForm);
    }

    if (this.permissionForm.valid) {
      this.permissionDetailService.save(this.permissionForm.value)
        .then(() => {
          return this.router.navigate(
            ['/inventory/permission/permission-list'],
          );
        });
    }
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PermissionDetailService } from './permission-detail.service';
import { EnumEntity } from '../../../../../_helpers/entity';
import { PositionSearchEntity } from '../../../_backend/position/position.search-entity';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { translate } from '../../../../../_helpers/string';
import { GeneralService } from '../../../../../_services/general-service.service';
import { PermissionDetailRepository } from './permission-detail.repository';

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

  inventoryDocumentTypeId: string = null;

  inventoryOrganizationId: string = null;

  documentStatus: EnumEntity[] = [];

  /**
   * Select position
   */
  positionSearchEntity: PositionSearchEntity = new PositionSearchEntity();

  constructor(
    private permissionDetailService: PermissionDetailService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private generalService: GeneralService,
    private router: Router,
    private permissionDetailRepository: PermissionDetailRepository,
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

    const routeSub: Subscription = this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params.legalEntityId && params.inventoryDocumentTypeId && params.inventoryOrganizationId) {
        this.inventoryDocumentTypeId = params.inventoryDocumentTypeId;
        this.inventoryOrganizationId = params.inventoryOrganizationId;
        this.getDocumentStatus();
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

    this.subscription
      .add(permissionFormSub)
      .add(routeSub);
  }

  get errors() {
    return this.permissionForm.get('errors') as FormGroup;
  }

  get positionCode() {
    return this.permissionForm.get('positionCode') as FormControl;
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
    });
  }

  ngOnInit() {
    return this.getDocumentStatus();
  }

  getDocumentStatus() {
    if (this.inventoryDocumentTypeId) {
      this.permissionDetailRepository.getDocumentStatus(this.inventoryDocumentTypeId)
        .subscribe(
          (documentStatus: EnumEntity[]) => {
            this.documentStatus = documentStatus;
          },
        );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  bookMark() {
  }

  cancel() {
    return this.router.navigate(
      ['/inventory/permission/permission-list'],
      {
        queryParams: this.activatedRoute.snapshot.queryParams,
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
            {
              queryParams: this.activatedRoute.snapshot.queryParams,
            },
          );
        });
    }
  }

  onSelectPosition(event) {
    if (event) {
      this.permissionForm.patchValue({
        positionCode: event.code,
        positionId: event.id,
        positionName: event.name,
      });
    }
  }
}

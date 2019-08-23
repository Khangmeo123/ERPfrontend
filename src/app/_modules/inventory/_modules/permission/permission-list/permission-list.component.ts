import { Component, OnDestroy, OnInit } from '@angular/core';
import { translate } from '../../../../../_helpers/string';
import { PermissionListService } from './permission-list.service';
import { GeneralService } from '../../../../../_services/general-service.service';
import { Subscription } from 'rxjs';
import { InventoryOrganizationSearchEntity } from '../../../_backend/inventory-organization/inventory-organization.search-entity';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PermissionEntity, PermissionSearchEntity } from '../permission.entities';
import { PaginationModel } from '../../../../../_shared/modules/pagination/pagination.model';
import { InventoryOrganizationEntity } from '../../../_backend/inventory-organization/inventory-organization.entity';
import { EnumEntity } from '../../../../../_helpers/entity';
import { PermissionListRepository } from './permission-list.repository';

@Component({
  selector: 'app-permission',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.scss'],
  providers: [
    PermissionListService,
    GeneralService,
  ],
})
export class PermissionListComponent implements OnInit, OnDestroy {

  pageTitle = translate('permission.header.title');

  /**
   * Select inventory organization
   */
  inventoryOrganization: InventoryOrganizationEntity = null;

  inventoryOrganizationSearchEntity: InventoryOrganizationSearchEntity = new InventoryOrganizationSearchEntity();

  inventoryDocumentType: EnumEntity = null;

  isBookMark: boolean = false;

  permissionList: PermissionEntity[] = [];

  permissionSearchEntity: PermissionSearchEntity = new PermissionSearchEntity();

  pagination: PaginationModel = new PaginationModel();

  subscription: Subscription = new Subscription();

  documentStatus: EnumEntity[] = [];

  constructor(
    private permissionService: PermissionListService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private permissionRepository: PermissionListRepository,
  ) {
    const routeSubscription: Subscription = this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params.inventoryOrganizationId) {
        this.permissionRepository.getInventoryOrganization(params.inventoryOrganizationId)
          .subscribe((inventoryOrganization: InventoryOrganizationEntity) => {
            this.inventoryOrganization = inventoryOrganization;
          });
      }
      if (params.inventoryDocumentTypeId) {
        this.getDocumentStatus(params.inventoryDocumentTypeId);
        this.permissionRepository.getInventoryDocumentType(params.inventoryDocumentTypeId)
          .subscribe((inventoryDocumentType: EnumEntity) => {
            this.inventoryDocumentType = inventoryDocumentType;
          });
      }
    });

    const listSubscription: Subscription = this.permissionService.permissionList.subscribe((list: PermissionEntity[]) => {
      this.permissionList = list;
    });

    const countSubscription: Subscription = this.permissionService.permissionCount.subscribe((count: number) => {
      this.pagination.totalItems = count;
    });

    this.subscription
      .add(routeSubscription)
      .add(listSubscription)
      .add(countSubscription);
  }

  get allSelected() {
    return this.inventoryOrganizationId && this.inventoryDocumentTypeId;
  }

  get inventoryOrganizationId() {
    if (this.inventoryOrganization) {
      return this.inventoryOrganization.id;
    }
    return null;
  }

  get inventoryDocumentTypeId() {
    if (this.inventoryDocumentType) {
      return this.inventoryDocumentType.id;
    }
    return null;
  }

  async ngOnInit() {
    const {queryParams} = this.activatedRoute.snapshot;
    if (queryParams.inventoryOrganizationId) {

    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  sort(event) {
    if (event.sortField && event.sortOrder) {
      this.permissionSearchEntity.orderBy = event.sortField;
      this.permissionSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
    }
    return this.getList();
  }

  getList() {
    if (this.allSelected) {
      return this.permissionService.getList(this.permissionSearchEntity);
    }
  }

  bookMark() {
  }

  add() {
    return this.router.navigate(
      ['/inventory/permission/permission-detail'],
      {
        queryParams: {
          inventoryOrganizationId: this.inventoryOrganizationId,
          inventoryDocumentTypeId: this.inventoryDocumentTypeId,
        },
      },
    );
  }

  onSelectCurrentDocumentStatus(event) {
    if (event) {
      this.permissionSearchEntity.currentStatusId = event.id;
      this.permissionSearchEntity.currentStatusDisplay = event.display;
      return this.getList();
    } else {
      this.permissionSearchEntity.currentStatusId = null;
      this.permissionSearchEntity.currentStatusDisplay = null;
      return this.getList();
    }
  }

  onSelectNextDocumentStatus(event) {
    if (event) {
      this.permissionSearchEntity.nextStatusId = event.id;
      this.permissionSearchEntity.nextStatusDisplay = event.display;
      return this.getList();
    } else {
      this.permissionSearchEntity.nextStatusId = null;
      this.permissionSearchEntity.nextStatusDisplay = null;
      return this.getList();
    }
  }

  patchIds() {
    this.permissionSearchEntity.inventoryDocumentTypeId = this.inventoryDocumentTypeId;
    this.permissionSearchEntity.inventoryOrganizationId = this.inventoryOrganizationId;
  }

  onClearSearch(table) {
    this.permissionSearchEntity = new PermissionSearchEntity();
    this.patchIds();
    table.reset();
  }

  onPaginate(event) {
    this.permissionSearchEntity.skip = event.skip;
    this.permissionSearchEntity.take = event.take;
    return this.getList();
  }

  getDocumentStatus(id: string) {
    if (id) {
      this.documentStatus = [];
      this.permissionRepository.getDocumentStatus(id)
        .subscribe(
          (documentStatus: EnumEntity[]) => {
            this.documentStatus = documentStatus;
          },
        );
    }
  }

  edit(permissionEntity: PermissionEntity) {
    return this.router.navigate(
      ['/inventory/permission/permission-detail'],
      {
        queryParams: {
          inventoryOrganizationId: this.inventoryOrganizationId,
          inventoryDocumentTypeId: this.inventoryDocumentTypeId,
          id: permissionEntity.id,
        },
      },
    );
  }

  onSelectInventoryOrganization(event) {
    if (event) {
      this.inventoryOrganization = event;
      this.permissionSearchEntity.inventoryOrganizationId = event.id;
      return this.getList();
    } else {
      this.inventoryOrganization = null;
      this.permissionSearchEntity.inventoryOrganizationId = null;
      return this.getList();
    }
  }

  onSelectInventoryDocumentType(event) {
    if (event) {
      this.inventoryDocumentType = event;
      this.permissionSearchEntity.inventoryDocumentTypeId = event.id;
      this.getDocumentStatus(event.id);
      return this.getList();
    } else {
      this.inventoryDocumentType = null;
      this.permissionSearchEntity.inventoryDocumentTypeId = null;
      this.getDocumentStatus(null);
    }
  }
}

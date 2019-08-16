import {Component, OnDestroy, OnInit} from '@angular/core';
import {translate} from '../../../../../_helpers/string';
import {LegalEntity} from '../../../_backend/legal-entity/legal.entity';
import {PermissionService} from './permission.service';
import {GeneralService} from '../../../../../_helpers/general-service.service';
import {Entities, EnumEntity} from '../../../../../_helpers/entity';
import {Subject, Subscription} from 'rxjs';
import {LegalSearchEntity} from '../../../../master-data/_backend/legal/legal.searchentity';
import {InventoryOrganizationEntity} from '../../../_backend/inventory-organization/inventory-organization.entity';
import {InventoryOrganizationSearchEntity} from '../../../_backend/inventory-organization/inventory-organization.search-entity';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PermissionEntity, PermissionSearchEntity} from '../permission.entities';
import {PaginationModel} from '../../../../../_shared/modules/pagination/pagination.model';
import {PositionEntity} from '../../../_backend/position/position.entity';
import {PositionSearchEntity} from '../../../_backend/position/position.search-entity';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss'],
  providers: [
    PermissionService,
    GeneralService,
  ],
})
export class PermissionComponent implements OnInit, OnDestroy {
  pageTitle = translate('permission.header.title');

  /**
   * Select legal entity
   */
  legalEntity: LegalEntity = null;
  legalEntityId: string = null;
  legalEntities: Entities = new Entities();
  legalSearchEntity: LegalSearchEntity = new LegalSearchEntity();
  legalSearchEntityTyping: Subject<LegalSearchEntity> = new Subject<LegalSearchEntity>();

  /**
   * Select inventory organization
   */
  inventoryOrganization: InventoryOrganizationEntity = null;
  inventoryOrganizationId: string = null;
  inventoryOrganizationEntities: Entities = new Entities();
  inventoryOrganizationSearchEntity: InventoryOrganizationSearchEntity = new InventoryOrganizationSearchEntity();
  inventoryOrganizationSearchEntityTyping: Subject<InventoryOrganizationSearchEntity> = new Subject<InventoryOrganizationSearchEntity>();

  /**
   * Select position
   */
  positionEntities: Entities = new Entities();
  positionSearchEntity: PositionSearchEntity = new PositionSearchEntity();
  positionSearchEntityTyping: Subject<PositionSearchEntity> = new Subject<PositionSearchEntity>();

  /**
   * Inventory document type
   */
  inventoryDocumentTypes: EnumEntity[] = [];
  inventoryDocumentType: EnumEntity = null;
  inventoryDocumentTypeId: string = null;

  isBookMark: boolean = false;

  subscription: Subscription = new Subscription();

  permissionList: PermissionEntity[] = [];

  permissionSearchEntity: PermissionSearchEntity = new PermissionSearchEntity();

  pagination: PaginationModel = new PaginationModel();

  documentStatus: EnumEntity[] = [];

  currentDocumentStatus: EnumEntity = null;

  nextDocumentStatus: EnumEntity = null;

  constructor(
    private permissionService: PermissionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    const documentTypeSub: Subscription = this.permissionService.inventoryDocumentTypes.subscribe((types: EnumEntity[]) => {
      this.inventoryDocumentTypes = types;
    });

    const documentStatusSub: Subscription = this.permissionService.documentStatus.subscribe((status: EnumEntity[]) => {
      this.documentStatus = status;
    });

    const positionTypingSub: Subscription = this.permissionService.searchPositionByTyping(this.positionSearchEntityTyping);
    const positionSub: Subscription = this.permissionService.positionList.subscribe((entities: Entities) => {
      this.positionEntities = entities;
    });

    const legalEntityTypingSub: Subscription = this.permissionService.searchLegalEntityByTyping(this.legalSearchEntityTyping);
    const legalEntitySub: Subscription = this.permissionService.legalEntityList.subscribe((entities: Entities) => {
      this.legalEntities = entities;
    });

    const inventoryOrganizationTypingSub: Subscription = this.permissionService.searchInventoryOrganizationByTyping(
      this.inventoryOrganizationSearchEntityTyping,
    );
    const inventoryOrganizationSub: Subscription = this.permissionService.inventoryOrganizationList.subscribe(
      (entities: Entities) => {
        this.inventoryOrganizationEntities = entities;
      },
    );

    const permissionListSub: Subscription = this.permissionService.permissionList.subscribe((list: PermissionEntity[]) => {
      this.permissionList = list;
    });

    const permissionCountSub: Subscription = this.permissionService.permissionCount.subscribe((count: number) => {
      this.pagination.totalItems = count;
    });

    const routeSub: Subscription = this.activatedRoute.params.subscribe((params: Params) => {
      this.legalEntityId = params.legalEntityId;
      this.inventoryOrganizationId = params.inventoryOrganizationId;
      this.inventoryDocumentTypeId = params.inventoryDocumentTypeId;
    });

    this.subscription
      .add(documentTypeSub)
      .add(inventoryOrganizationSub)
      .add(legalEntitySub)
      .add(legalEntityTypingSub)
      .add(inventoryOrganizationTypingSub)
      .add(permissionCountSub)
      .add(permissionListSub)
      .add(positionSub)
      .add(positionTypingSub)
      .add(documentStatusSub)
      .add(routeSub);
  }

  get allSelected() {
    return this.legalEntity && this.inventoryOrganization && this.inventoryDocumentType;
  }

  async ngOnInit() {
    await Promise.all([
      this.getLegalEntityList(),
      this.getDocumentList(),
    ]);
    if (this.inventoryDocumentTypes.length) {
      this.onSelectInventoryDocumentType(this.inventoryDocumentTypes[0]);
    }
    return this.onSelectLegalEntity(this.legalEntities.exceptIds);
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

  nodeSelector = node => node;

  bookMark() {
  }

  async onSelectLegalEntity(event) {
    if (event && event.length) {
      const legalEntity: LegalEntity = event[0];
      this.legalEntity = legalEntity;
      this.permissionSearchEntity.legalEntityId = legalEntity.id;
      this.legalSearchEntity.ids = [
        legalEntity.id,
      ];
      await this.getInventoryOrganizationList();
      await this.onSelectInventoryOrganization(this.inventoryOrganizationEntities.exceptIds);
    }
  }

  onSelectInventoryOrganization(event) {
    if (event && event.length) {
      const inventoryOrganization: InventoryOrganizationEntity = event[0];
      this.inventoryOrganization = inventoryOrganization;
      this.permissionSearchEntity.inventoryOrganizationId = inventoryOrganization.id;
      this.inventoryOrganizationSearchEntity.ids = [
        inventoryOrganization.id,
      ];
      return this.getList();
    }
  }

  onSelectInventoryDocumentType(event) {
    if (event) {
      this.inventoryDocumentType = event;
      this.permissionSearchEntity.inventoryDocumentTypeId = this.inventoryDocumentType.id;
      this.getDocumentStatus(this.inventoryDocumentType.id);
    }
    return this.getList();
  }

  onSelectCurrentDocumentStatus(event) {
    if (event) {
      this.currentDocumentStatus = event;
      this.permissionSearchEntity.currentStatusId = this.currentDocumentStatus.id;
      return this.getList();
    }
  }

  onSelectNextDocumentStatus(event) {
    if (event) {
      this.nextDocumentStatus = event;
      this.permissionSearchEntity.nextStatusId = this.nextDocumentStatus.id;
      return this.getList();
    }
  }

  onSelectPosition(event) {
    if (event && event.length) {
      const positionEntity: PositionEntity = event[0];
      this.permissionSearchEntity.positionId = positionEntity.id;
      this.permissionSearchEntity.positionCode = positionEntity.code;
      this.positionSearchEntity.ids = [
        positionEntity.id,
      ];
      return this.getList();
    }
  }

  getLegalEntityList() {
    const {ids} = this.legalSearchEntity;
    this.legalSearchEntity = new LegalSearchEntity();
    this.legalSearchEntity.ids = ids;
    return this.permissionService.getLegalEntityList(this.legalSearchEntity);
  }

  getDocumentList() {
    if (this.inventoryDocumentTypes.length === 0) {
      return this.permissionService.getInventoryDocumentTypes();
    }
  }

  getDocumentStatus(id: string) {
    if (id) {
      this.documentStatus = [];
      this.permissionService.getDocumentStatus(id)
        .then(() => {
        });
    }
  }

  getPositionList() {
    if (this.legalEntity) {
      const {ids} = this.positionSearchEntity;
      this.positionSearchEntity = new PositionSearchEntity();
      this.positionSearchEntity.ids = ids;
      this.positionSearchEntity.name.startsWith = this.permissionSearchEntity.positionName.startsWith;
      this.positionSearchEntity.legalEntityId = this.legalEntity.id;
      return this.permissionService.getPositionList(this.positionSearchEntity);
    }
  }

  getInventoryOrganizationList() {
    if (this.legalEntity) {
      const {ids} = this.inventoryOrganizationSearchEntity;
      this.inventoryOrganizationSearchEntity = new InventoryOrganizationSearchEntity();
      this.inventoryOrganizationSearchEntity.ids = ids;
      this.inventoryOrganizationSearchEntity.legalEntityId = this.legalEntity.id;
      return this.permissionService.getInventoryOrganizationList(this.inventoryOrganizationSearchEntity);
    }
  }

  onSearchLegalEntity(event) {
    const {ids} = this.legalSearchEntity;
    this.legalSearchEntity = new LegalSearchEntity();
    this.legalSearchEntity.ids = ids;
    this.legalSearchEntity.name.startsWith = event;
    this.legalSearchEntityTyping.next(this.legalSearchEntity);
  }

  onSearchPosition(event) {
    const {ids} = this.positionSearchEntity;
    this.positionSearchEntity = new PositionSearchEntity();
    this.positionSearchEntity.ids = ids;
    this.positionSearchEntity.code.startsWith = event;
    this.positionSearchEntity.name.startsWith = this.permissionSearchEntity.positionName.startsWith;
    this.positionSearchEntityTyping.next(this.positionSearchEntity);
  }

  onSearchInventoryOrganization(event) {
    const {ids} = this.inventoryOrganizationSearchEntity;
    this.inventoryOrganizationSearchEntity = new InventoryOrganizationSearchEntity();
    this.inventoryOrganizationSearchEntity.ids = ids;
    this.inventoryOrganizationSearchEntity.name.startsWith = event;
    this.inventoryOrganizationSearchEntityTyping.next(this.inventoryOrganizationSearchEntity);
  }

  add() {
    return this.router.navigate(
      ['/inventory/permission/permission-detail'],
      {
        queryParams: {
          legalEntityId: this.legalEntity.id,
          inventoryOrganizationId: this.inventoryOrganization.id,
          inventoryDocumentTypeId: this.inventoryDocumentType.id,
        },
      },
    );
  }

  patchIds() {
    this.permissionSearchEntity.legalEntityId = this.legalEntity.id;
    this.permissionSearchEntity.inventoryDocumentTypeId = this.inventoryDocumentType.id;
    this.permissionSearchEntity.inventoryOrganizationId = this.inventoryOrganization.id;
  }

  onClearSearch(table) {
    this.permissionSearchEntity = new PermissionSearchEntity();
    this.positionSearchEntity = new PositionSearchEntity();
    this.patchIds();
    this.currentDocumentStatus = null;
    this.nextDocumentStatus = null;
    table.reset();
  }

  onPaginate(event) {
    this.permissionSearchEntity.skip = event.skip;
    this.permissionSearchEntity.take = event.take;
    return this.getList();
  }

  edit(permissionEntity: PermissionEntity) {
    return this.router.navigate(
      ['/inventory/permission/permission-detail'],
      {
        queryParams: {
          legalEntityId: this.legalEntity.id,
          inventoryOrganizationId: this.inventoryOrganization.id,
          inventoryDocumentTypeId: this.inventoryDocumentType.id,
          id: permissionEntity.id,
        },
      },
    );
  }
}

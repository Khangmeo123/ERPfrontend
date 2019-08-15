import {Component, OnDestroy, OnInit} from '@angular/core';
import {translate} from '../../../../../_helpers/string';
import {LegalEntity} from '../../../_backend/legal-entity/legal.entity';
import {PermissionService} from './permission.service';
import {GeneralService} from '../../../../../_helpers/general-service.service';
import {Entities} from '../../../../../_helpers/entity';
import {Subject, Subscription} from 'rxjs';
import {LegalSearchEntity} from '../../../../master-data/_backend/legal/legal.searchentity';
import {DocumentEntity} from '../../../_backend/document/document.entity';
import {DocumentSearchEntity} from '../../../_backend/document/document.search-entity';
import {InventoryOrganizationEntity} from '../../../_backend/inventory-organization/inventory-organization.entity';
import {InventoryOrganizationSearchEntity} from '../../../_backend/inventory-organization/inventory-organization.search-entity';
import {Router} from '@angular/router';
import {PermissionEntity, PermissionSearchEntity} from '../permission.entities';
import {PaginationModel} from '../../../../../_shared/modules/pagination/pagination.model';

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
  legalEntities: Entities = new Entities();
  legalSearchEntity: LegalSearchEntity = new LegalSearchEntity();
  legalSearchEntityTyping: Subject<LegalSearchEntity> = new Subject<LegalSearchEntity>();
  /**
   * Select document
   */
  document: DocumentEntity = null;
  documentEntities: Entities = new Entities();
  documentSearchEntity: DocumentSearchEntity = new DocumentSearchEntity();
  documentSearchEntityTyping: Subject<DocumentSearchEntity> = new Subject<DocumentSearchEntity>();
  /**
   * Select inventory organization
   */
  inventoryOrganization: InventoryOrganizationEntity = null;
  inventoryOrganizationEntities: Entities = new Entities();
  inventoryOrganizationSearchEntity: InventoryOrganizationSearchEntity = new InventoryOrganizationSearchEntity();
  inventoryOrganizationSearchEntityTyping: Subject<InventoryOrganizationSearchEntity> = new Subject<InventoryOrganizationSearchEntity>();

  isBookMark: boolean = false;

  subscription: Subscription = new Subscription();

  permissionList: PermissionEntity[] = [];

  permissionSearchEntity: PermissionSearchEntity = new PermissionSearchEntity();

  pagination: PaginationModel = new PaginationModel();

  constructor(
    private permissionService: PermissionService,
    private router: Router,
  ) {
    const documentTypingSub: Subscription = this.permissionService.searchDocumentByTyping(this.documentSearchEntityTyping);
    const documentSub: Subscription = this.permissionService.documentList.subscribe((entities: Entities) => {
      this.documentEntities = entities;
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

    this.subscription
      .add(documentSub)
      .add(inventoryOrganizationSub)
      .add(legalEntitySub)
      .add(documentTypingSub)
      .add(legalEntityTypingSub)
      .add(inventoryOrganizationTypingSub)
      .add(permissionCountSub)
      .add(permissionListSub);
  }

  ngOnInit() {
    return Promise.all([
      this.getLegalEntityList(),
      this.getDocumentList(),
    ])
      .then(async ([legalEntities, documentEntities]) => {
        const inventoryOrganizationEntities: Entities = await this.getInventoryOrganizationList();
        return [legalEntities, inventoryOrganizationEntities, documentEntities];
      });
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
    return this.permissionService.getList(this.permissionSearchEntity);
  }

  nodeSelector = node => node;

  bookMark() {
  }

  onSelectLegalEntity(event) {
    if (event && event.length) {
      const legalEntity: LegalEntity = event[0];
      this.legalEntity = legalEntity;
      this.legalSearchEntity.ids = [
        legalEntity.id,
      ];
    }
  }

  onSelectInventoryOrganization(event) {
    if (event && event.length) {
      const inventoryOrganization: InventoryOrganizationEntity = event[0];
      this.legalEntity = inventoryOrganization;
      this.inventoryOrganizationSearchEntity.ids = [
        inventoryOrganization.id,
      ];
    }
  }

  onSelectDocumentType(event) {
    if (event && event.length) {
      const documentEntity: DocumentEntity = event[0];
      this.legalEntity = documentEntity;
      this.documentSearchEntity.ids = [
        documentEntity.id,
      ];
    }
  }

  getLegalEntityList() {
    const {ids} = this.legalSearchEntity;
    this.legalSearchEntity = new LegalSearchEntity();
    this.legalSearchEntity.ids = ids;
    return this.permissionService.getLegalEntityList(this.legalSearchEntity);
  }

  getDocumentList() {
    const {ids} = this.documentSearchEntity;
    this.documentSearchEntity = new DocumentSearchEntity();
    this.documentSearchEntity.ids = ids;
    return this.permissionService.getDocumentList(this.documentSearchEntity);
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

  onSearchDocument(event) {
    const {ids} = this.documentSearchEntity;
    this.documentSearchEntity = new DocumentSearchEntity();
    this.documentSearchEntity.ids = ids;
    this.documentSearchEntity.name.startsWith = event;
    this.documentSearchEntityTyping.next(this.documentSearchEntity);
  }

  onSearchInventoryOrganization(event) {
    const {ids} = this.inventoryOrganizationSearchEntity;
    this.inventoryOrganizationSearchEntity = new InventoryOrganizationSearchEntity();
    this.inventoryOrganizationSearchEntity.ids = ids;
    this.inventoryOrganizationSearchEntity.name.startsWith = event;
    this.inventoryOrganizationSearchEntityTyping.next(this.inventoryOrganizationSearchEntity);
  }

  add() {
    return this.router.navigate(['/inventory/permission/permission-detail']);
  }

  onClearSearch(table) {
    this.permissionSearchEntity = new PermissionSearchEntity();
    table.reset();
  }
}

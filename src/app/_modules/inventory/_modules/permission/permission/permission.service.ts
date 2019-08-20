import {Injectable} from '@angular/core';
import {PermissionRepository} from './permission.repository';
import {BehaviorSubject, forkJoin, Observable, Subscription} from 'rxjs';
import {Entities, EnumEntity} from '../../../../../_helpers/entity';
import {LegalSearchEntity} from '../../../_backend/legal-entity/legal.search-entity';
import {ToastrService} from 'ngx-toastr';
import {translate} from '../../../../../_helpers/string';
import {InventoryOrganizationSearchEntity} from '../../../_backend/inventory-organization/inventory-organization.search-entity';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {PermissionEntity, PermissionSearchEntity} from '../permission.entities';
import {PositionSearchEntity} from '../../../_backend/position/position.search-entity';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  legalEntityList: BehaviorSubject<Entities> = new BehaviorSubject<Entities>(new Entities());

  inventoryDocumentTypes: BehaviorSubject<EnumEntity[]> = new BehaviorSubject<EnumEntity[]>([]);

  documentStatus: BehaviorSubject<EnumEntity[]> = new BehaviorSubject<EnumEntity[]>([]);

  inventoryOrganizationList: BehaviorSubject<Entities> = new BehaviorSubject<Entities>(new Entities());

  permissionList: BehaviorSubject<PermissionEntity[]> = new BehaviorSubject<PermissionEntity[]>([]);

  permissionCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  positionList: BehaviorSubject<Entities> = new BehaviorSubject<Entities>(new Entities());

  constructor(private permissionRepository: PermissionRepository, private toastrService: ToastrService) {
  }

  getLegalEntityList(legalSearchEntity: LegalSearchEntity): Promise<Entities> {
    return new Promise<Entities>((resolve, reject) => {
      this.permissionRepository.getLegalEntityList(legalSearchEntity)
        .subscribe(
          (entities: Entities) => {
            this.legalEntityList.next(entities);
            resolve(entities);
          },
          (error: Error) => {
            this.toastrService.error(translate('legalEntity.get.error'));
            reject(error);
          },
        );
    });
  }

  getInventoryDocumentTypes(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.permissionRepository.getInventoryDocumentTypes()
        .subscribe(
          (documentTypes: EnumEntity[]) => {
            this.inventoryDocumentTypes.next(documentTypes);
            resolve();
          },
          (error: Error) => {
            this.toastrService.error(translate('inventoryDocumentTypes.get.error'));
            reject(error);
          },
        );
    });
  }

  getDocumentStatus(id: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.permissionRepository.getDocumentStatus(id)
        .subscribe(
          (documentTypes: EnumEntity[]) => {
            this.documentStatus.next(documentTypes);
            resolve();
          },
          (error: Error) => {
            this.toastrService.error(translate('documentStatus.get.error'));
            reject(error);
          },
        );
    });
  }

  getPositionList(positionSearchEntity: PositionSearchEntity): Promise<Entities> {
    return new Promise<Entities>((resolve, reject) => {
      this.permissionRepository.getPositionList(positionSearchEntity)
        .subscribe(
          (entities: Entities) => {
            this.positionList.next(entities);
            resolve(entities);
          },
          (error: Error) => {
            this.toastrService.error(translate('positionEntity.get.error'));
            reject(error);
          },
        );
    });
  }

  getInventoryOrganizationList(inventoryOrganizationSearchEntity: InventoryOrganizationSearchEntity): Promise<Entities> {
    return new Promise<Entities>((resolve, reject) => {
      this.permissionRepository.getInventoryOrganizationList(inventoryOrganizationSearchEntity)
        .subscribe(
          (entities: Entities) => {
            this.inventoryOrganizationList.next(entities);
            resolve(entities);
          },
          (error: Error) => {
            this.toastrService.error(translate('inventoryOrganizationEntity.get.error'));
            reject(error);
          },
        );
    });
  }

  searchLegalEntityByTyping(legalSearchEntityTyping: Observable<LegalSearchEntity>): Subscription {
    return legalSearchEntityTyping.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(
        (legalSearchEntity: LegalSearchEntity) => {
          return this.permissionRepository.getLegalEntityList(legalSearchEntity);
        },
      ),
    )
      .subscribe((entities: Entities) => {
        this.legalEntityList.next(entities);
      });
  }

  searchPositionByTyping(positionSearchEntityTyping: Observable<PositionSearchEntity>): Subscription {
    return positionSearchEntityTyping.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(
        (positionSearchEntity: PositionSearchEntity) => {
          return this.permissionRepository.getPositionList(positionSearchEntity);
        },
      ),
    )
      .subscribe((entities: Entities) => {
        this.positionList.next(entities);
      });
  }

  searchInventoryOrganizationByTyping(
    inventoryOrganizationSearchEntityTyping: Observable<InventoryOrganizationSearchEntity>,
  ): Subscription {
    return inventoryOrganizationSearchEntityTyping.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(
        (inventoryOrganizationSearchEntity: InventoryOrganizationSearchEntity) => {
          return this.permissionRepository.getInventoryOrganizationList(inventoryOrganizationSearchEntity);
        },
      ),
    )
      .subscribe((entities: Entities) => {
        this.inventoryOrganizationList.next(entities);
      });
  }

  getList(permissionSearchEntity: PermissionSearchEntity): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      forkJoin(
        this.permissionRepository.getList(permissionSearchEntity),
        this.permissionRepository.count(permissionSearchEntity),
      )
        .subscribe(
          ([list, count]) => {
            this.permissionList.next(list);
            this.permissionCount.next(count);
          },
          (error: Error) => {
            reject(error);
          },
        );
    });
  }
}

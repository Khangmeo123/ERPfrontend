import {Injectable} from '@angular/core';
import {PermissionRepository} from './permission.repository';
import {BehaviorSubject, forkJoin, Observable, Subscription} from 'rxjs';
import {Entities} from '../../../../../_helpers/entity';
import {LegalSearchEntity} from '../../../_backend/legal-entity/legal.search-entity';
import {ToastrService} from 'ngx-toastr';
import {translate} from '../../../../../_helpers/string';
import {DocumentSearchEntity} from '../../../_backend/document/document.search-entity';
import {InventoryOrganizationSearchEntity} from '../../../_backend/inventory-organization/inventory-organization.search-entity';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {PermissionEntity, PermissionSearchEntity} from '../permission.entities';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  legalEntityList: BehaviorSubject<Entities> = new BehaviorSubject<Entities>(new Entities());

  documentList: BehaviorSubject<Entities> = new BehaviorSubject<Entities>(new Entities());

  inventoryOrganizationList: BehaviorSubject<Entities> = new BehaviorSubject<Entities>(new Entities());

  permissionList: BehaviorSubject<PermissionEntity[]> = new BehaviorSubject<PermissionEntity[]>([]);

  permissionCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

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

  getDocumentList(documentSearchEntity: DocumentSearchEntity): Promise<Entities> {
    return new Promise<Entities>((resolve, reject) => {
      this.permissionRepository.getDocumentList(documentSearchEntity)
        .subscribe(
          (entities: Entities) => {
            this.documentList.next(entities);
            resolve(entities);
          },
          (error: Error) => {
            this.toastrService.error(translate('documentEntity.get.error'));
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

  searchDocumentByTyping(documentSearchEntityTyping: Observable<DocumentSearchEntity>): Subscription {
    return documentSearchEntityTyping.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(
        (documentSearchEntity: DocumentSearchEntity) => {
          return this.permissionRepository.getDocumentList(documentSearchEntity);
        },
      ),
    )
      .subscribe((entities: Entities) => {
        this.documentList.next(entities);
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

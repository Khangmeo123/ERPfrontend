import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PermissionEntity, PermissionForm} from '../permission.entities';
import {PermissionDetailRepository} from './permission-detail.repository';
import {Entities, EnumEntity} from '../../../../../_helpers/entity';
import {PositionSearchEntity} from '../../../_backend/position/position.search-entity';
import {translate} from '../../../../../_helpers/string';
import {ToastrService} from 'ngx-toastr';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PermissionDetailService {
  permissionForm: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(null);

  positionList: BehaviorSubject<Entities> = new BehaviorSubject<Entities>(new Entities());

  documentStatus: BehaviorSubject<EnumEntity[]> = new BehaviorSubject<EnumEntity[]>([]);

  constructor(
    private permissionDetailRepository: PermissionDetailRepository,
    private fb: FormBuilder,
    private toastrService: ToastrService,
  ) {
    this.permissionForm.next(
      this.fb.group(
        new PermissionForm(),
      ),
    );
  }

  getPositionList(positionSearchEntity: PositionSearchEntity): Promise<Entities> {
    return new Promise<Entities>((resolve, reject) => {
      this.permissionDetailRepository.getPositionList(positionSearchEntity)
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

  searchPositionByTyping(positionSearchEntityTyping: Observable<PositionSearchEntity>): Subscription {
    return positionSearchEntityTyping.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(
        (positionSearchEntity: PositionSearchEntity) => {
          return this.permissionDetailRepository.getPositionList(positionSearchEntity);
        },
      ),
    )
      .subscribe((entities: Entities) => {
        this.positionList.next(entities);
      });
  }

  getDocumentStatus(inventoryDocumentTypeId: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.permissionDetailRepository.getDocumentStatus(inventoryDocumentTypeId)
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

  get(id: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.permissionDetailRepository.get(id)
        .subscribe(
          (permissionEntity: PermissionEntity) => {
            this.permissionForm.next(
              this.fb.group(
                new PermissionForm(permissionEntity),
              ),
            );
            resolve();
          },
          (error: Error) => {
            reject(error);
          },
        );
    });
  }

  save(permissionEntity: PermissionEntity): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      (
        permissionEntity.id
          ? this.permissionDetailRepository.update(permissionEntity)
          : this.permissionDetailRepository.create(permissionEntity)
      )
        .subscribe(
          () => {
            this.toastrService.success('permission.update.success');
            resolve();
          },
          (error: Error) => {
            this.toastrService.error('permission.update.error');
            reject(error);
          },
        );
    });
  }

}

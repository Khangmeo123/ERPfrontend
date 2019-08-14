import {Injectable} from '@angular/core';
import {BinLocationRepository} from './bin-location.repository';
import {BehaviorSubject} from 'rxjs';
import {LegalSearchEntity} from '../../../../_backend/legal/legal.searchentity';
import {Entities} from '../../../../../../_helpers/entity';
import {BinLocationFieldSearchEntity, BinLocationSearchEntity} from '../../../../_backend/bin-location/bin-location.search-entity';
import {BinLocationEntity, BinLocationFieldEntity} from '../../../../_backend/bin-location/bin-location.entity';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BinLocationForm} from '../../../../_backend/bin-location/bin-location.form';
import {ToastrService} from 'ngx-toastr';
import {translate} from '../../../../../../_helpers/string';

@Injectable({
  providedIn: 'root',
})
export class BinLocationService {

  public legalEntityList: BehaviorSubject<Entities> = new BehaviorSubject<Entities>(new Entities());

  public subLevel1List: BehaviorSubject<BinLocationEntity[]> = new BehaviorSubject<BinLocationEntity[]>([]);

  public subLevel2List: BehaviorSubject<BinLocationEntity[]> = new BehaviorSubject<BinLocationEntity[]>([]);

  public subLevel3List: BehaviorSubject<BinLocationEntity[]> = new BehaviorSubject<BinLocationEntity[]>([]);

  public subLevel4List: BehaviorSubject<BinLocationEntity[]> = new BehaviorSubject<BinLocationEntity[]>([]);

  public binLocationForm: BehaviorSubject<FormGroup>;

  public binLocationFieldEntity: BehaviorSubject<BinLocationFieldEntity> = new BehaviorSubject(new BinLocationFieldEntity());

  public level: number;

  constructor(private binLocationRepository: BinLocationRepository, private fb: FormBuilder, private toastrService: ToastrService) {
    this.binLocationForm = new BehaviorSubject<FormGroup>(
      this.fb.group(
        new BinLocationForm(),
      ),
    );
  }

  getLegalEntityList(legalSearchEntity: LegalSearchEntity): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      return this.binLocationRepository.getLegalEntityList(legalSearchEntity)
        .subscribe(
          (entities: Entities) => {
            this.legalEntityList.next(entities);
            resolve();
          },
          (error: Error) => {
            reject(error);
          },
        );
    });
  }

  getSubLevel1List(binLocationSearchEntity: BinLocationSearchEntity): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      return this.binLocationRepository.getSubLevel1List(binLocationSearchEntity)
        .subscribe(
          (list: BinLocationEntity[]) => {
            this.subLevel1List.next(list);
            resolve();
          },
          (error: Error) => {
            reject(error);
          },
        );
    });
  }

  getSubLevel2List(binLocationSearchEntity: BinLocationSearchEntity): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      return this.binLocationRepository.getSubLevel2List(binLocationSearchEntity)
        .subscribe(
          (list: BinLocationEntity[]) => {
            this.subLevel2List.next(list);
            resolve();
          },
          (error: Error) => {
            reject(error);
          },
        );
    });
  }

  getSubLevel3List(binLocationSearchEntity: BinLocationSearchEntity): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      return this.binLocationRepository.getSubLevel3List(binLocationSearchEntity)
        .subscribe(
          (list: BinLocationEntity[]) => {
            this.subLevel3List.next(list);
            resolve();
          },
          (error: Error) => {
            reject(error);
          },
        );
    });
  }

  getSubLevel4List(binLocationSearchEntity: BinLocationSearchEntity): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      return this.binLocationRepository.getSubLevel4List(binLocationSearchEntity)
        .subscribe(
          (list: BinLocationEntity[]) => {
            this.subLevel4List.next(list);
            resolve();
          },
          (error: Error) => {
            reject(error);
          },
        );
    });
  }

  resetForm() {
    this.binLocationForm.next(
      this.fb.group(
        new BinLocationForm(),
      ),
    );
  }

  add(level: number) {
    this.resetForm();
    this.level = level;
  }

  cancel() {
    this.resetForm();
    this.level = null;
  }

  edit(binLocationEntity: BinLocationEntity, level: number) {
    this.binLocationForm.next(
      this.fb.group(
        new BinLocationForm(binLocationEntity),
      ),
    );
    this.level = level;
  }

  save(binLocationEntity: BinLocationEntity, binLocationSearchEntity: BinLocationSearchEntity): Promise<BinLocationEntity> {
    return new Promise<BinLocationEntity>((resolve, reject) => {
      return (
        binLocationEntity.id
          ? this.binLocationRepository.updateSubLevelEntity(this.level, binLocationEntity)
          : this.binLocationRepository.createSubLevelEntity(this.level, binLocationEntity)
      )
        .subscribe(
          (entity: BinLocationEntity) => {
            this.toastrService.success(translate('binLocation.update.success'));
            this[`getSubLevel${this.level}List`](binLocationSearchEntity);
            resolve(entity);
          },
          (error: Error) => {
            this.toastrService.error(translate('binLocation.update.error'));
            reject(error);
          },
        );
    });
  }

  delete(binLocationEntity: BinLocationEntity, binLocationSearchEntity: BinLocationSearchEntity): Promise<BinLocationEntity> {
    return new Promise<BinLocationEntity>((resolve, reject) => {
      return this.binLocationRepository.deleteSubLevelEntity(this.level, binLocationEntity)
        .subscribe(
          (entity: BinLocationEntity) => {
            this.toastrService.success(translate('binLocation.update.success'));
            this[`getSubLevel${this.level}List`](binLocationSearchEntity);
            resolve(entity);
          },
          (error: Error) => {
            this.toastrService.error(translate('binLocation.update.error'));
            reject(error);
          },
        );
    });
  }

  getBinLocationFieldEntity(binLocationFieldSearchEntity: BinLocationFieldSearchEntity): Promise<BinLocationFieldEntity> {
    return new Promise<BinLocationFieldEntity>((resolve, reject) => {
      return this.binLocationRepository.getBinLocationFieldEntity(binLocationFieldSearchEntity)
        .subscribe(
          (binLocationFieldEntity: BinLocationFieldEntity) => {
            this.binLocationFieldEntity.next(binLocationFieldEntity);
            resolve(binLocationFieldEntity);
          },
          (error: Error) => {
            this.toastrService.error(translate('binLocation.getFieldEntity.error'));
            reject(error);
          },
        );
    });
  }
}

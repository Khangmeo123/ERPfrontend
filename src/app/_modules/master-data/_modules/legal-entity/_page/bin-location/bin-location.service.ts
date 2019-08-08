import {Injectable} from '@angular/core';
import {BinLocationRepository} from './bin-location.repository';
import {BehaviorSubject} from 'rxjs';
import {LegalSearchEntity} from '../../../../_backend/legal/legal.searchentity';
import {Entities} from '../../../../../../_helpers/entity';
import {BinLocationSearchEntity} from '../../../../_backend/bin-location/bin-location.search-entity';
import {BinLocationEntity} from '../../../../_backend/bin-location/bin-location.entity';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BinLocationForm} from '../../../../_backend/bin-location/bin-location.form';

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

  constructor(private binLocationRepository: BinLocationRepository, private fb: FormBuilder) {
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

  updateSubLevelEntity(level: number, binLocationEntity: BinLocationEntity): Promise<BinLocationEntity> {
    return new Promise<BinLocationEntity>((resolve, reject) => {
      return this.binLocationRepository.updateSubLevelEntity(level, binLocationEntity)
        .subscribe(
          (responseEntity: BinLocationEntity) => resolve(responseEntity),
          (error: Error) => reject(error),
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

  add() {
    this.resetForm();
  }

  cancel() {
    this.resetForm();
  }

  edit(binLocationEntity: BinLocationEntity) {
    this.binLocationForm.next(
      this.fb.group(
        new BinLocationForm(binLocationEntity),
      ),
    );
  }
}

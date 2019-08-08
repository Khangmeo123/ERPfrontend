import { Injectable } from '@angular/core';
import { BinLocationRepository } from './bin-location.repository';
import { BehaviorSubject } from 'rxjs';
import { LegalSearchEntity } from '../../../../_backend/legal/legal.searchentity';
import { Entities } from '../../../../../../_helpers/entity';
import { BinLocationSearchEntity } from '../../../../_backend/bin-location/bin-location.search-entity';
import { BinLocationEntity } from '../../../../_backend/bin-location/bin-location.entity';

@Injectable({
  providedIn: 'root',
})
export class BinLocationService {

  public legalEntityList: BehaviorSubject<Entities> = new BehaviorSubject<Entities>(new Entities());

  public subLevel1List: BehaviorSubject<BinLocationEntity[]> = new BehaviorSubject<BinLocationEntity[]>([]);

  public subLevel2List: BehaviorSubject<BinLocationEntity[]> = new BehaviorSubject<BinLocationEntity[]>([]);

  public subLevel3List: BehaviorSubject<BinLocationEntity[]> = new BehaviorSubject<BinLocationEntity[]>([]);

  public subLevel4List: BehaviorSubject<BinLocationEntity[]> = new BehaviorSubject<BinLocationEntity[]>([]);

  constructor(private binLocationRepository: BinLocationRepository) {
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
      return this.binLocationRepository.getSubLevel1List(binLocationSearchEntity)
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
      return this.binLocationRepository.getSubLevel1List(binLocationSearchEntity)
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
      return this.binLocationRepository.getSubLevel1List(binLocationSearchEntity)
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
}

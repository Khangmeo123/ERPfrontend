import { Injectable } from '@angular/core';
import { Entities } from '../_helpers/entity';
import { BehaviorSubject, Subject } from 'rxjs';
import { LegalSearchEntity } from '../_modules/master-data/_backend/legal/legal.searchentity';
import { AppRepository } from '../_repositories/app.repository';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { LegalEntity } from '../_modules/master-data/_backend/legal/legal.entity';
import { ToastrService } from 'ngx-toastr';
import { translate } from '../_helpers/string';

@Injectable({
  providedIn: 'root',
})
export class AppService {

  isSidebarPinned = false; // default true

  isSidebarToggeled = false;

  public legalEntity: Subject<LegalEntity> = new Subject<LegalEntity>();

  public legalEntities: BehaviorSubject<Entities> = new BehaviorSubject<Entities>(new Entities());

  public legalSearchEntityTyping: Subject<LegalSearchEntity> = new BehaviorSubject(new LegalSearchEntity());

  constructor(private appRepository: AppRepository, private toastrService: ToastrService) {
    this.legalEntity.next(JSON.parse(localStorage.getItem('legalEntity')) || null);
    this.legalSearchEntityTyping.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((searchEntity: LegalSearchEntity) => {
        return this.appRepository.getLegalEntityList(searchEntity);
      }),
    )
      .subscribe(
        (entities: Entities) => {
          this.legalEntities.next(entities);
        },
      );
  }

  toggleSidebar() {
    this.isSidebarToggeled = !this.isSidebarToggeled;
  }

  toggleSidebarPin() {
    this.isSidebarPinned = !this.isSidebarPinned;
  }

  getSidebarStat() {
    return {
      isSidebarPinned: this.isSidebarPinned,
      isSidebarToggeled: this.isSidebarToggeled,
    };
  }

  getLegalEntityList(legalSearchEntity: LegalSearchEntity): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.appRepository.getLegalEntityList(legalSearchEntity)
        .subscribe(
          (entities: Entities) => {
            this.legalEntities.next(entities);
            resolve();
          },
          (error: Error) => {
            reject(error);
          },
        );
    });
  }

  getLegalEntity(id: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.appRepository.getLegalEntity(id)
        .subscribe(
          (legalEntity: LegalEntity) => {
            this.legalEntity.next(legalEntity);
            resolve();
          },
          (error: Error) => {
            this.toastrService.error(translate('general.legalEntity.get.error'));
            reject(error);
          },
        );
    });
  }
}

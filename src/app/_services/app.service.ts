import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppRepository } from '../_repositories/app.repository';
import { LegalEntity } from '../_modules/master-data/_backend/legal/legal.entity';
import { ToastrService } from 'ngx-toastr';
import { translate } from '../_helpers/string';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AppService {

  public isPinned: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public isToggled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public legalEntity: BehaviorSubject<LegalEntity> = new BehaviorSubject<LegalEntity>(null);

  public legalEntities: BehaviorSubject<LegalEntity[]> = new BehaviorSubject<LegalEntity[]>([]);

  constructor(
    private appRepository: AppRepository,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.isToggled.next(true);
  }

  toggleSidebar() {
    this.isToggled.next(!this.isToggled.getValue());
  }

  toggleSidebarPin() {
    this.isPinned.next(!this.isPinned.getValue());
  }

  getLegalEntityList = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      return this.appRepository.getLegalEntityList()
        .subscribe(
          (legalEntities: LegalEntity[]) => {
            this.legalEntities.next(legalEntities);
            resolve();
          },
          (error: Error) => {
            this.toastrService.error(translate('general.legalEntityList.get.error'));
            reject(error);
          },
        );
    });
  };

  getLegalEntity = (id: string): Promise<LegalEntity> => {
    return new Promise<LegalEntity>((resolve, reject) => {
      return this.appRepository.getLegalEntity(id)
        .subscribe(
          (legalEntity: LegalEntity) => {
            resolve(legalEntity);
          },
          (error: Error) => {
            this.toastrService.error(translate('general.legalEntityList.get.error'));
            reject(error);
          },
        );
    });
  };

  selectLegalEntity = (legalEntity: LegalEntity) => {
    this.legalEntity.next(legalEntity);
    localStorage.setItem('legalEntityId', legalEntity.id);
    return this.router.navigate(
      [window.location.pathname],
      {
        queryParams: {
          ...this.activatedRoute.snapshot.queryParams,
          legalEntityId: legalEntity.id,
        },
      },
    );
  };
}

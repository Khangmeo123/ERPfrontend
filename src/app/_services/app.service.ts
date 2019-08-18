import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { AppRepository } from '../_repositories/app.repository';
import { LegalEntity } from '../_modules/master-data/_backend/legal/legal.entity';
import { ToastrService } from 'ngx-toastr';
import { translate } from '../_helpers/string';
import { JwtInterceptor } from '../_helpers';

@Injectable({
  providedIn: 'root',
})
export class AppService {

  isSidebarPinned = false; // default true

  isToggled = false;

  public legalEntityId: Subject<string> = new Subject<string>();

  public legalEntities: BehaviorSubject<LegalEntity[]> = new BehaviorSubject<LegalEntity[]>([]);

  constructor(private appRepository: AppRepository, private toastrService: ToastrService, private jwtInterceptor: JwtInterceptor) {
    this.legalEntityId.next(JSON.parse(localStorage.getItem('legalEntityId')) || null);
  }

  toggleSidebar() {
    this.isToggled = !this.isToggled;
  }

  toggleSidebarPin() {
    this.isSidebarPinned = !this.isSidebarPinned;
  }

  getSidebarStat() {
    return {
      isSidebarPinned: this.isSidebarPinned,
      isToggled: this.isToggled,
    };
  }

  getLegalEntityList(): Subscription {
    return this.appRepository.getLegalEntityList()
      .subscribe(
        (legalEntities: LegalEntity[]) => {
          this.legalEntities.next(legalEntities);
        },
        (error: Error) => {
          this.toastrService.error(translate('general.legalEntityList.get.error'));
          throw error;
        },
      );
  }

  getLegalEntity(id: string): void {
    this.appRepository.getLegalEntity(id)
      .subscribe(
        (legalEntity: LegalEntity) => {
          this.jwtInterceptor.legalEntityId.next(legalEntity.id);
        },
        () => {
          this.toastrService.error(translate('general.legalEntity.get.error'));
        },
      );
  }
}

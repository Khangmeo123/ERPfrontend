import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AppRepository } from '../_repositories/app.repository';
import { LegalEntity } from '../_modules/master-data/_backend/legal/legal.entity';
import { ToastrService } from 'ngx-toastr';
import { translate } from '../_helpers/string';

@Injectable({
  providedIn: 'root',
})
export class AppService {

  isSidebarPinned = false; // default true

  isToggled = false;

  public legalEntities: BehaviorSubject<LegalEntity[]> = new BehaviorSubject<LegalEntity[]>([]);

  constructor(private appRepository: AppRepository, private toastrService: ToastrService) {
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

  getLegalEntity(id: string): Observable<LegalEntity> {
    return this.appRepository.getLegalEntity(id);
  }
}

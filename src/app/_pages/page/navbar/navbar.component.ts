import { TranslateService } from '@ngx-translate/core';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AppService, AuthenticationService } from '../../../_services';
import { toggleMenu } from 'src/app/_shared/animations/toggleMenu';
import { Subscription } from 'rxjs';
import { UserEntity } from '../../../_helpers/entity';
import { LegalEntity } from '../../../_modules/master-data/_backend/legal/legal.entity';
import { LanguageEntity, languages } from '../../../_constants/languages';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRepository } from '../../../_repositories/app.repository';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [toggleMenu],
})
export class NavbarComponent implements OnInit, OnDestroy {

  @Output()
  public changeToggle = new EventEmitter();

  public languageSelected: LanguageEntity;

  public languages: LanguageEntity[] = languages;

  public isCollapsed = true;

  public isPinned = false;

  public isToggleFlags = false;

  public isOpened = false;

  public user: UserEntity = null;

  public subscription: Subscription = new Subscription();

  public legalEntity: LegalEntity = null;

  public legalEntities: LegalEntity[] = [];

  constructor(
    public translateService: TranslateService,
    public authenticationService: AuthenticationService,
    public appService: AppService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public appRepository: AppRepository,
  ) {
    this.languageSelected = languages[0];

    const legalEntitySubscription: Subscription = this.appService.legalEntity.subscribe((legalEntity: LegalEntity) => {
      this.legalEntity = legalEntity;
    });

    const legalEntitiesSubscription: Subscription = this.appService.legalEntities.subscribe((legalEntities: LegalEntity[]) => {
      this.legalEntities = legalEntities;
    });

    const userSubscription: Subscription = this.authenticationService.currentUser.subscribe((user) => {
      this.user = user;
    });

    this.subscription
      .add(userSubscription)
      .add(legalEntitiesSubscription)
      .add(legalEntitySubscription);
  }

  get listState() {
    return this.isToggleFlags ? 'opened' : 'closed';
  }

  get listStateMenu() {
    return this.isPinned ? 'opened' : 'closed';
  }

  get legalEntityId() {
    const legalEntityId: string = localStorage.getItem('legalEntityId');
    if (legalEntityId) {
      return legalEntityId;
    }
    return '';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  selectDefaultLegalEntity = () => {
    this.appService.getLegalEntityList()
      .then(() => {
        if (this.legalEntities.length > 0) {
          return this.appService.selectLegalEntity(this.legalEntities[0]);
        }
      });
  };

  getCurrentLegalEntity() {
    this.appService.getLegalEntity(this.legalEntityId)
      .then((legalEntity: LegalEntity) => {
        return this.appService.selectLegalEntity(legalEntity);
      });
  }

  ngOnInit() {
    const {queryParams} = this.activatedRoute.snapshot;
    if (queryParams.legalEntityId && queryParams.legalEntityId !== this.legalEntityId) {
      localStorage.setItem('legalEntityId', queryParams.legalEntityId);
    }
    if (this.legalEntityId) {
      this.getCurrentLegalEntity();
    } else {
      this.selectDefaultLegalEntity();
    }
  }

  onToggle() {
    this.isPinned = !this.isPinned;
  }

  onToggleFlag() {
    this.isToggleFlags = !this.isToggleFlags;
  }

  onClickChangeLanguage(item: LanguageEntity) {
    this.languageSelected = item;
    this.translateService.use(item.value);
    this.isToggleFlags = false;
  }

  closeDropdown() {
    if (this.isToggleFlags) {
      this.isToggleFlags = false;
    }
  }

  closeDropMenu() {
    if (this.isPinned) {
      this.isPinned = false;
    }
  }
}

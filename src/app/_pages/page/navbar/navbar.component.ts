import { TranslateService } from '@ngx-translate/core';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AppService, AuthenticationService } from '../../../_services';
import { toggleMenu } from 'src/app/_shared/animations/toggleMenu';
import { Subscription } from 'rxjs';
import { UserEntity } from '../../../_helpers/entity';
import { LegalEntity } from '../../../_modules/master-data/_backend/legal/legal.entity';
import { LanguageEntity, languages } from '../../../_constants/languages';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [toggleMenu],
  providers: [
    AppService,
    AuthenticationService,
  ],
})
export class NavbarComponent implements OnInit, OnDestroy {
  languageSelected: LanguageEntity;

  isToggleMenu = false;

  languages: LanguageEntity[] = languages;

  @Output() changeToggle = new EventEmitter();

  isCollapsed = true;

  isPinned = false;

  isToggleFlags = false;

  isOpened = false;

  public user: UserEntity = null;

  public subscription: Subscription = new Subscription();

  public legalEntityId: string = null;

  public legalEntities: LegalEntity[] = [];

  constructor(
    public translateService: TranslateService,
    private authenticationService: AuthenticationService,
    private appService: AppService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.languageSelected = languages[0];

    const legalEntitySub: Subscription = this.appService.legalEntityId.subscribe((legalEntityId: string) => {
      this.legalEntityId = legalEntityId;
    });

    const legalEntitiesSub: Subscription = this.appService.legalEntities.subscribe((legalEntities: LegalEntity[]) => {
      this.legalEntities = legalEntities;
    });

    const userSub: Subscription = this.authenticationService.currentUser.subscribe((user) => {
      this.user = user;
    });

    const routeSub: Subscription = this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params.legalEntityId) {
        return this.appService.getLegalEntity(params.legalEntityId);
      }
    });

    this.subscription
      .add(routeSub)
      .add(userSub)
      .add(legalEntitySub)
      .add(legalEntitiesSub);
  }

  get listState() {
    return this.isToggleFlags ? 'opened' : 'closed';
  }

  get listStateMenu() {
    return this.isPinned ? 'opened' : 'closed';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.getLegalEntityList();
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

  onClickLogOut() {
    return this.authenticationService.logout();
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

  toggleSidebarPin() {
    this.isToggleMenu = !this.isToggleMenu;
    this.appService.toggleSidebarPin();
    this.changeToggle.emit(this.isToggleMenu);
  }

  toggleSidebar() {
    this.appService.toggleSidebar();
  }

  onChangeLegalEntity(legalEntityId) {
    this.appService.legalEntityId.next(legalEntityId);
    this.router.navigate([this.router.url], {
      queryParams: {
        legalEntityId,
      },
    })
      .then(() => {
        window.location.reload();
      });
  }

  getLegalEntityList() {
    this.appService.getLegalEntityList();
  }
}

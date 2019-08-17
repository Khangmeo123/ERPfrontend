import { TranslateService } from '@ngx-translate/core';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AppService, AuthenticationService } from '../../../_services';
import { toggleMenu } from 'src/app/_shared/animations/toggleMenu';
import { Subscription } from 'rxjs';
import { LegalSearchEntity } from '../../../_modules/master-data/_backend/legal/legal.searchentity';
import { Entities } from '../../../_helpers/entity';
import { LegalEntity } from '../../../_modules/master-data/_backend/legal/legal.entity';
import { LanguageEntity, languages } from '../../../_constants/languages';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [toggleMenu],
  providers: [
    AuthenticationService,
    AppService,
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

  public subscription: Subscription = new Subscription();

  public legalEntities: Entities = new Entities();

  public legalSearchEntity: LegalSearchEntity = new LegalSearchEntity();

  constructor(
    public translateService: TranslateService,
    private authenticationService: AuthenticationService,
    private appService: AppService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.translateService.setDefaultLang('vi');
    this.translateService.use('vi');
    this.languageSelected = languages[0];

    const legalEntitySub: Subscription = this.appService.legalEntity.subscribe((legalEntity: LegalEntity) => {
      this.legalEntity = legalEntity;
    });

    const routeSub: Subscription = this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params.legalEntityId) {
        return this.appService.getLegalEntity(params.legalEntityId);
      }
    });

    this.subscription
      .add(routeSub)
      .add(legalEntitySub)
      .add(this.appService.legalEntities.subscribe((entities: Entities) => {
        this.legalEntities = entities;
      }));
  }

  get listState() {
    return this.isToggleFlags ? 'opened' : 'closed';
  }

  get listStateMenu() {
    return this.isPinned ? 'opened' : 'closed';
  }

  get legalEntity(): LegalEntity {
    return JSON.parse(localStorage.getItem('legalEntity')) || null;
  }

  set legalEntity(legalEntity: LegalEntity) {
    localStorage.setItem('legalEntity', JSON.stringify(legalEntity));
  }

  nodeSelector = node => node;

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {

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

  getList() {
    return this.appService.getLegalEntityList(this.legalSearchEntity);
  }

  onOpenLegalEntityList() {
    this.legalSearchEntity = new LegalSearchEntity();
    return this.appService.getLegalEntityList(this.legalSearchEntity);
  }

  onSearchLegalEntity(event) {
    const {ids} = this.legalSearchEntity;
    this.legalSearchEntity = new LegalSearchEntity();
    this.legalSearchEntity.ids = ids;
    this.legalSearchEntity.name.startsWith = event;
    this.appService.legalSearchEntityTyping.next(this.legalSearchEntity);
  }

  onSelectLegalEntity(event) {
    if (event && event.length) {
      this.appService.legalEntity.next(event[0]);
    }
  }
}

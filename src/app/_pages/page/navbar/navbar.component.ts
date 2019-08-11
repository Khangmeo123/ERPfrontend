import { TranslateService } from '@ngx-translate/core';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AppService, AuthenticationService } from '../../../_services';
import { toggleMenu } from 'src/app/_shared/animations/toggleMenu';
import { UserEntity } from '../../../_entities/user/user.entity';
import { Subscription } from 'rxjs';

interface LanguageEntity {
  label: string;
  value: string;
  image: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [toggleMenu],
})
export class NavbarComponent implements OnInit, OnDestroy {
  languageSelected: LanguageEntity;

  isToggleMenu = false;

  language: Array<LanguageEntity> = [
    {
      label: 'Việt Nam',
      value: 'vi',
      image: '/assets/img/flags/vi.png',
    },
    {
      label: 'US',
      value: 'en',
      image: '/assets/img/flags/en.png',
    },
  ];

  @Output() changeToggle = new EventEmitter();

  isCollapsed = true;

  isPinned = false;

  isToggleFlags = false;

  isOpened = false;

  public user: UserEntity = null;

  public subscription: Subscription = new Subscription();

  constructor(
    private appService: AppService,
    public translateService: TranslateService,
    private authenticationService: AuthenticationService,
  ) {
    this.translateService.setDefaultLang('vi');
    this.languageSelected = this.language[0];

    const userSub: Subscription = this.authenticationService.currentUser.subscribe((user) => {
      this.user = user;
    });

    this.subscription.add(userSub);
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

  onClickLogOut(event) {
    this.authenticationService.logout();
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
}

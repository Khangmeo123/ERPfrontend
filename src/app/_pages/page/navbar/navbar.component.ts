import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppService, AuthenticationService } from '../../../_services';
import { toggleMenu } from 'src/app/_shared/animations/toggleMenu';

interface LanguageEntity {
  label: string;
  value: string;
  image: string;
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [toggleMenu]
})
export class NavbarComponent implements OnInit {
  languageSelected: LanguageEntity;
  isToggleMenu = false;
  language: Array<LanguageEntity> = [
    { label: 'Việt Nam', value: 'vi', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAVCAIAAACor3u9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjlDQUIzODNCMEQzMDExRTZBRkJGOTIzQjBCQThCRTAxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjlDQUIzODNDMEQzMDExRTZBRkJGOTIzQjBCQThCRTAxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OUNBQjM4MzkwRDMwMTFFNkFGQkY5MjNCMEJBOEJFMDEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OUNBQjM4M0EwRDMwMTFFNkFGQkY5MjNCMEJBOEJFMDEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6slXOeAAABQUlEQVR42uxUsU7DMBC9s500aSGhFdAihFiAz2Bm6UoYmGFkZ+NLkPgHBiQ22JjohBALFCGBhNJCEiWp7SMFqSO1RDIgOFmW/Aa/d77nh7frK1BlMai4/hoBqUoJEERTA1VEoIB7unUw/GykVAJKUScoQ2Zv5P5OLDpKDViBUIYmBOLbuwE41DdT1tDqlftBghbN7UbRucvnlXzh2bU9VaGYIj8H5tLiUVgI/0Ka+2/Fym6s58MWaURGP3giBBTwfureby0Vqifw4GTmodtJr2ooqIQZsFkaPfL8zhof9HhLezU1ZOhSSUOWYC0rrxtHZ24/aKc92w8i1iBDLxnYVKK9NgqPvae9heTC6W+3k0vHXpWkjFyEJmmKHHSMaFNhKpBFT8jqZPirhVFCSECHJsZFTuaZwQxD4j+ufzHBhwADAGGPdzoW02LFAAAAAElFTkSuQmCCMTIzMw==' },
    { label: 'US', value: 'en', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAARCAIAAAAzPjmrAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFCM0QxQTlGMEQyRDExRTZBOEJGRTZCOUM2NjUxNEM1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFCM0QxQUEwMEQyRDExRTZBOEJGRTZCOUM2NjUxNEM1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUIzRDFBOUQwRDJEMTFFNkE4QkZFNkI5QzY2NTE0QzUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QUIzRDFBOUUwRDJEMTFFNkE4QkZFNkI5QzY2NTE0QzUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5Osz06AAACAklEQVR42rSTO2/TUBiGfeyTNs7FtY/tJDaxkyZCpFwqMbGj0rFSESMDG7+AjbELf4C1P6FTFyRY6NIJqUMiRSIXx0l8i3NpokJjO3xUYmSoJZ/hO+cs73ue9/sOOjr6uJXCvn+tKKTft+t1td02Gw2t1TIaDR3O+sPyVrdz3P6OaLSh7r3Qq4MPqkowxsvlDbeTnU2XgpADPyJyvr8gQt7zr+Vs6uT9AYXQ/fUpnM2maYZZzFeg7rkzWeZte1osCdbYL5UEx5nyhGOi9Y3t0igOAZ7PVyy7zQs5151DSqbpaZpsGI6uFwam+0AVx5Plb8tsnnxF8Qx4PpfPs543LylkOJyALnSiWi31elalUhwMXEniSOX54afPkGeciCDo7XRKknbGo0m5LIF6pVrsdMa1GnjYml4wrdlt37h4/Q4MYhJw+YzjzhRFNE0XCHpd647A1rTCaOhJspBlKfK4DlNExetBJpOWRM6yfEUVIRPwMAxQl03TUVVpOJqkZK769g0MURwCQvIMQ8N7IfFW09jb06+uOvv7NahPn+22mv3dR3rY7X57eUzTdJx/8HM03UQbmkFhGGGGCYIQp5hg/a9iZh1GLIpI8IuKA0Dh4PQUtvDucvufukJoEWuE/hpYlz+oJBeKgjBRA/zlxWGyBIOz82QJ0gU5WYIz5UmiBn8EGAAtZN8UaBAz4gAAAABJRU5ErkJggjE0MjY=' },
  ];
  @Output() changeToggle = new EventEmitter();

  constructor(
    private appService: AppService,
    public translateService: TranslateService,
    public authenticationService: AuthenticationService) {
    this.translateService.setDefaultLang('vi');
    this.translateService.use('vi');
    this.languageSelected = this.language[0];
  }

  isCollapsed = true;
  isPinned = false;
  isLogout = false;
  isToggleFlags = false;
  isOpened = false;

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
    this.isLogout = !this.isLogout;
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

  get listState() {
    return this.isToggleFlags ? 'opened' : 'closed';
  }

  get listStateMenu() {
    return this.isPinned ? 'opened' : 'closed';
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

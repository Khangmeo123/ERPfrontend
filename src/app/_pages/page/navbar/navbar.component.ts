import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AppService} from '../../../_services';
import {SelectItem} from 'primeng/api';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  language: Array<any> = [];
  private languageSelected: string = 'flag-vn';
  isToggleMenu = false;
  @Output() changeToggle = new EventEmitter();

  constructor(private appService: AppService) {
    this.language = [
      {label: 'Việt Nam', value: 'flag-vn'},
      {label: 'US', value: 'flag-us'},
    ];
  }

  isCollapsed = true;
  isToggle = false;
  isLogout = false;
  isToggleFlags = false;

  ngOnInit() {

  }

  onToggle() {
    this.isToggle = !this.isToggle;
    console.log('onToggle', this.isToggle);
  }

  onToggleFlag() {
    this.isToggleFlags = !this.isToggleFlags;
  }

  onClickChangeLanguage(item) {
    console.log(item);
    this.languageSelected = item.value;
    this.isToggleFlags = false;
  }

  onClickLogOut(event) {
    this.isLogout = !this.isLogout;
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

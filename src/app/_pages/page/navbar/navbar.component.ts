
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppService } from '../../../_services';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private isToggleMenu = false;
  @Output() changeToggle = new EventEmitter()

  constructor(private appService: AppService) { }
  isCollapsed = true;
  ngOnInit() {
  }


  toggleSidebarPin() {
    this.isToggleMenu = !this.isToggleMenu;
    console.log('toggleSidebarPin', this.isToggleMenu);
    this.appService.toggleSidebarPin();
    this.changeToggle.emit(this.isToggleMenu)
  }
  toggleSidebar() {
    this.appService.toggleSidebar();
  }

}

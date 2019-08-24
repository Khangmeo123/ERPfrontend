import { Component, Input, OnInit } from '@angular/core';
import { SidebarItem } from '../interfaces/SidebarItem';
import { Router } from '@angular/router';
import { toggleMenuSideBar } from '../sidebar.animation';

@Component({
  selector: 'app-sidebar-list',
  templateUrl: './sidebar-list.component.html',
  styleUrls: ['./sidebar-list.component.scss'],
  animations: [
    toggleMenuSideBar,
  ],
})
export class SidebarListComponent implements OnInit {
  @Input() level = 0;

  @Input() root: SidebarItem = {route: '/'};

  @Input() menu: SidebarItem[] = [];

  @Input() pinned = false;

  @Input() isOpened = false;

  constructor(private router: Router) {
  }

  get caretClass() {
    return `pi pi-caret-${this.isOpened ? 'up' : 'down'} mr-1`;
  }

  get routeUrl() {
    return this.router.url;
  }

  get legalEntityId() {
    const legalEntityId: string = localStorage.getItem('legalEntityId');
    if (legalEntityId) {
      return legalEntityId;
    }
    return '';
  }

  ngOnInit() {
    const {
      routeUrl,
    } = this;
    this.menu.forEach(item => {
      if (routeUrl.includes(item.route)) {
        if (item.children && item.children.length) {
          item.isOpened = !item.isOpened;
        }
      } else {
        if (item.children && item.children.length && this.root.route !== '/') {
          item.isShowed = !item.isShowed;
        }
      }
    });
  }

  toggleChildren(item: SidebarItem) {
    this.menu.forEach(i => {
      if (i.route !== item.route) {
        i.isShowed = !i.isShowed;
      }
    });
    if (item.children && item.children.length) {
      item.isOpened = !item.isOpened;
    }
  }
}

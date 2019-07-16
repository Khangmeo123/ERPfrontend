import { Component, Input, OnInit } from '@angular/core';
import { SidebarItem } from '../interfaces/SidebarItem';
import { ActivatedRoute, Router } from '@angular/router';
import { toggleMenuSideBar } from '../sidebar.animation';

@Component({
  selector: 'app-sidebar-list',
  templateUrl: './sidebar-list.component.html',
  styleUrls: ['./sidebar-list.component.scss'],
  animations: [
    toggleMenuSideBar,
  ]
})
export class SidebarListComponent implements OnInit {
  @Input() level = 0;

  @Input() root = { route: '' };

  @Input() menu: SidebarItem[] = [];

  @Input() pinned = false;

  @Input() isOpened = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  get caretClass() {
    return `pi pi-caret-${this.isOpened ? 'up' : 'down'} mr-1`;
  }

  get routeUrl() {
    console.log(this.router.url);
    return this.router.url;
  }

  ngOnInit() {
    const {
      routeUrl,
    } = this;
    if ((!this.root && routeUrl !== '/') || (this.root.route < routeUrl)) {
      this.isOpened = true;
    }
  }

  toggleChildren(item: SidebarItem) {
    if (item.children && item.children.length) {
      this.isOpened = !this.isOpened;
    }
  }
}

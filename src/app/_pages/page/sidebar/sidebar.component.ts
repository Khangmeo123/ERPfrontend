import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { toggleMenuNavbar, toggleMenuNavbarLeft, toggleMenuSideBar } from '../../../_shared/animations/sidebar.animation';
import { SidebarItem } from './interfaces/SidebarItem';
import { sampleSidebarMenu } from './sidebar.sample';
import { AppService, BookmarkService } from '../../../_services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: [
    './sidebar.component.scss',
  ],
  animations: [
    toggleMenuSideBar,
    toggleMenuNavbar,
    toggleMenuNavbarLeft,
  ],
  providers: [],
})
export class SidebarComponent implements OnInit, OnChanges {
  @Input() menu: SidebarItem[] = sampleSidebarMenu;

  @Input() bookmarks: SidebarItem[] = sampleSidebarMenu;

  @Input() showBookmarks = false;

  @Input() isOpened = true;

  constructor(
    private appService: AppService,
    private bookmarkService: BookmarkService,
  ) {
  }

  get bookmarkMenuState() {
    return this.showBookmarks ? 'show' : 'hide';
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes): void {
  }

  toggleBookmarks() {
    this.showBookmarks = !this.showBookmarks;
  }

  get bookmarkCaret() {
    return `pi pi-caret-${this.showBookmarks ? 'up' : 'down'} mr-1`;
  }

  get animationStateLeft() {
    return this.showBookmarks ? 'open' : 'closed';
  }
}

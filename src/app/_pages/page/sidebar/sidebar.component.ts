import { Component, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { toggleMenuNavbar, toggleMenuNavbarLeft, toggleMenuSideBar } from '../../../_shared/animations/sidebar.animation';
import { SidebarItem } from './interfaces/SidebarItem';
import { sampleSidebarMenu } from './sidebar.sample';
import { AppService, BookMark, BookmarkService } from '../../../_services';

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
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent implements OnInit, OnChanges {
  @Input() menu: SidebarItem[] = sampleSidebarMenu;

  @Input() showBookmarks = false;

  @Input() isOpened = true;

  bookmarks: BookMark[] = [];

  constructor(
    private appService: AppService,
    private bookmarkService: BookmarkService,
  ) {
    this.bookmarks = this.bookmarkService.listBookMarks;
  }

  get bookmarkMenuState() {
    return this.showBookmarks ? 'show' : 'hide';
  }

  get bookmarkCaret() {
    return `pi pi-caret-${this.showBookmarks ? 'up' : 'down'} mr-1`;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes): void {
  }

  toggleBookmarks() {
    this.showBookmarks = !this.showBookmarks;
  }

  removeBookmark(bookmark: BookMark) {
    this.bookmarkService.deleteBookMarks(bookmark);
  }
}

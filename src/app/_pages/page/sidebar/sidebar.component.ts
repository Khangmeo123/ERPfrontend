import { Component, OnInit, Input, HostListener, ElementRef, OnChanges } from '@angular/core';
import { ItemSidebar } from './itemsidebar/itemsidebar.entity';
import { AppService, BookmarkService } from 'src/app/_services';
import { toggleMenuSideBar, toggleMenuNavbar, toggleMenuNavbarLeft } from './sidebar.animation';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [toggleMenuSideBar, toggleMenuNavbar, toggleMenuNavbarLeft]
})
export class SidebarComponent implements OnInit, OnChanges {
  public isShowChil = true;
  public isShowBookMark = false;
  public listBookMark: Array<any> = [];
  private length = 0;

  @Input() toggleMenu = false;
  constructor(private appService: AppService, private bookmarkService: BookmarkService) {
  }
  private isOpened = false;
  navItems: ItemSidebar[] = [
    {
      displayName: 'Data Table',
      iconName: 1,
      route: 'admin',
      children: [
        {
          displayName: 'Editable Table',
          iconName: 0,
          route: '/admin',
        },
        {
          displayName: 'Table',
          iconName: 0,
          route: '/admin',
        },
        {
          displayName: 'Feedback',
          iconName: 0,
          route: '/admin'
        }
      ]
    }
  ];

  ngOnInit() {
    this.navItems.forEach(item => {
      item.disabled = true;
    });
    this.listBookMark = this.bookmarkService.listBookMarks;
  }

  ngOnChanges(channges: any) {
    if (channges.toggleMenu && channges.toggleMenu !== undefined) {
      this.isShowChil = this.toggleMenu;
    }
    this.waitWidth();
    console.log('ngOnChanges', channges)

  }

  get animationStateLeft() {
    return this.isShowChil ? 'open' : 'closed';
  }


  waitWidth() {
    const element = document.querySelector('.sidebar') as HTMLInputElement;
    if (element && element.style.width === '260px') {
      element.classList.add('set-opacity');
    } else {
      element.classList.remove('set-opacity');
    }
  }

  onClickBookmark() {
    let element = document.querySelector('.menu-bookmark-line');
    this.length = this.listBookMark.length;
    this.isShowBookMark = !this.isShowBookMark;
    if (this.isShowBookMark) {
      element.classList.add('show');
    } else {
      element.classList.remove('show');
    }
    this.navItems.forEach(item => {
      item.disabled = true;
    })
  }


  changeMenu(event) {
    this.navItems = event;
  }

}

import { Component, OnInit, Input, HostListener, ElementRef, OnChanges } from '@angular/core';
import { ItemSidebar } from './itemsidebar/itemsidebar.entity';
import { AppService } from 'src/app/_services';
import { toggleMenuSideBar, toggleMenuNavbar, toggleMenuNavbarRight, toggleMenuNavbarLeft } from './sidebar.animation';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [toggleMenuSideBar, toggleMenuNavbar, toggleMenuNavbarRight, toggleMenuNavbarLeft]
})
export class SidebarComponent implements OnInit, OnChanges {
  public isShowChil = true;
  public isShowBookMark = false;
  public listBookMark: Array<any> = [];
  private length = 0;

  @Input() toggleMenu = false;
  constructor(
    private appService: AppService) {
    this.listBookMark = JSON.parse(localStorage.getItem('key_luu_book_mark'));
    this.length = this.listBookMark.length;
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
          route: 'admin',
        },
        {
          displayName: 'Feedback',
          iconName: 0,
          route: '/admin'
        }
      ]
    },
    {
      displayName: 'Disney',
      iconName: 1,
      // children: [
      //   {
      //     displayName: 'Speakers',
      //     iconName: 0,
      //     children: [
      //       {
      //         displayName: 'Michael Prentice',
      //         iconName: 0,
      //         route: 'michael-prentice',
      //       },
      //       {
      //         displayName: 'Stephen Fluin',
      //         iconName: 0,
      //         route: 'stephen-fluin',
      //       ]
      //   },
      //   {
      //     displayName: 'Sessions',
      //     iconName: 0,
      //     children: [
      //       {
      //         displayName: 'Enterprise UIs',
      //         iconName: 0,
      //         route: 'material-design'
      //       },
      //       {
      //         displayName: 'What\'s up?',
      //         iconName: 0,
      //         route: 'what-up-web'
      //       },
      //       {
      //         displayName: 'the CLI',
      //         iconName: 0,
      //         route: 'my-ally-cli'
      //       },
      //       {
      //         displayName: 'Angular Tailor',
      //         iconName: 0,
      //         route: 'become-angular-tailer'
      //       }
      //     ]
      //   },
      //   {
      //     displayName: 'Feedback',
      //     iconName: 0,
      //     route: 'feedback'
      //   }
      // ]
    },
    {
      displayName: 'Orlando',
      iconName: 1,
      children: [
        {
          displayName: 'Speakers',
          iconName: 0,
          children: [
            {
              displayName: 'Michael Prentice',
              iconName: 0,
              route: 'michael-prentice',
            },
            {
              displayName: 'Stephen Fluin',
              iconName: 0,
              route: 'stephen-fluin',
              children: [
                {
                  displayName: 'What\'s up ',
                  iconName: 0,
                  route: 'what-up-web'
                }
              ]
            },
            {
              displayName: 'Mike Brocchi',
              iconName: 0,
              route: 'mike-brocchi',
              children: [
                {
                  displayName: 'My ally, the CLI',
                  iconName: 0,
                  route: 'my-ally-cli'
                },
                {
                  displayName: 'Angular Tailor',
                  iconName: 0,
                  route: 'become-angular-tailer'
                }
              ]
            }
          ]
        },
        {
          displayName: 'Sessions',
          iconName: 0,
          children: [
            {
              displayName: 'Enterprise UIs',
              iconName: 0,
              route: 'material-design'
            },
            {
              displayName: 'the Web?',
              iconName: 0,
              route: 'what-up-web'
            },
            {
              displayName: 'My ally, the CLI',
              iconName: 0,
              route: 'my-ally-cli'
            },
            {
              displayName: 'Angular Tailor',
              iconName: 0,
              route: 'become-angular-tailer'
            }
          ]
        },
        {
          displayName: 'Feedback',
          iconName: 0,
          route: 'feedback'
        }
      ]
    },
    {
      displayName: 'Maleficent',
      disabled: true,
      iconName: 1,
      children: [
        {
          displayName: 'Speakers',
          iconName: 0,
          children: [
            {
              displayName: 'Michael Prentice',
              iconName: 0,
              route: 'michael-prentice',
              children: [
                {
                  displayName: 'Enterprise UIs',
                  iconName: 0,
                  route: 'material-design'
                }
              ]
            },
            {
              displayName: 'Stephen Fluin',
              iconName: 0,
              route: 'stephen-fluin',
              children: [
                {
                  displayName: 'the Web?',
                  iconName: 0,
                  route: 'what-up-web'
                }
              ]
            },
            {
              displayName: 'Mike Brocchi',
              iconName: 0,
              route: 'mike-brocchi',
              children: [
                {
                  displayName: 'the CLI',
                  iconName: 0,
                  route: 'my-ally-cli'
                },
                {
                  displayName: 'Angular Tailor',
                  iconName: 0,
                  route: 'become-angular-tailer'
                }
              ]
            }
          ]
        },
        {
          displayName: 'Sessions',
          iconName: 0,
          children: [
            {
              displayName: 'Enterprise UIs',
              iconName: 0,
              route: 'material-design'
            },
            {
              displayName: 'the Web?',
              iconName: 0,
              route: 'what-up-web'
            },
            {
              displayName: 'the CLI',
              iconName: 0,
              route: 'my-ally-cli'
            },
            {
              displayName: 'Angular Tailor',
              iconName: 0,
              route: 'become-angular-tailer'
            }
          ]
        },
        {
          displayName: 'Feedback',
          iconName: 0,
          route: 'feedback'
        }
      ]
    }
  ];

  ngOnInit() {
    this.navItems.forEach(item => {
      item.disabled = true;
    })
    console.log('ngOnInit', this.listBookMark)
  }

  ngOnChanges(channges: any) {
    if (channges.toggleMenu && channges.toggleMenu !== undefined) {
      this.isShowChil = this.toggleMenu;
    }
    this.waitWidth();
    console.log('ngOnChanges', channges)

  }

  get animationState() {
    return !this.isShowChil ? 'open' : 'closed';
  }

  get animationStateLeft() {
    return this.isShowChil ? 'open' : 'closed';
  }


  waitWidth(){
    const element = document.querySelector('.sidebar') as HTMLInputElement;
    console.log('element.style.width', element.style.width)
    if(element && element.style.width === '260px'){
      element.classList.add('set-opacity');
    } else {
      element.classList.remove('set-opacity');
    }
    console.log('element', element);
  }

  onClickBookmark() {
    let element = document.querySelector('.menu-bookmark-line');
    console.log('element', element)
    this.listBookMark = JSON.parse(localStorage.getItem('key_luu_book_mark'));
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

  deleteBookMark(item) {
    const index = this.listBookMark.indexOf(item);
    if (index > -1) {
      this.listBookMark.splice(index, 1);
      localStorage.setItem('key_luu_book_mark', JSON.stringify(this.listBookMark));
    }

    // console.log('deleteBookMark', index)
  }


  changeMenu(event){
    this.navItems = event;
    console.log('changeMenu', event);
  }


}

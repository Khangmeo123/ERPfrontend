import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';
import { ItemSidebar } from './itemsidebar/itemsidebar.entity';
import { AppService } from 'src/app/_services';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { toggleMenu } from 'src/app/_shared/select/tree-select/tree-select.animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [toggleMenu]
})
export class SidebarComponent implements OnInit {
  public isShowChil: boolean = true;
  public isShowBookMark: boolean = false;
  public listBookMark: Array<any> = [];
  private length = 0;
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
    console.log('ngOnInit', this.listBookMark)
  }

  ngOnChanges(channges) {
    console.log('ngOnChanges', channges)

  }

  get animationState() {
    return this.isOpened ? 'open' : 'closed';
  }

  onEnterMouse() {
    console.log('onEnterMouse')
    this.listBookMark = JSON.parse(localStorage.getItem('key_luu_book_mark'));
    this.isShowChil = false;
    this.appService.toggleSidebarPin();
  }

  onLeaveMouse() {
    console.log('onLeaveMouse')
    this.isShowChil = true;
    this.appService.toggleSidebarPin();
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
  }

  deleteBookMark(item) {
    const index = this.listBookMark.indexOf(item);
    if (index > -1) {
      this.listBookMark.splice(index, 1);
      localStorage.setItem('key_luu_book_mark', JSON.stringify(this.listBookMark));
    }

    // console.log('deleteBookMark', index)
  }


}

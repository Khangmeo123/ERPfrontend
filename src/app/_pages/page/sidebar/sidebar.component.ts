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
      displayName: 'Dữ liệu đầu vào',
      iconName: 1,
      route: '/business-group',
      children: [
        {
          displayName: 'Quản lý ngân hàng',
          iconName: 0,
          route: '/business-group/bank',
        },
        {
          displayName: 'Quản lý sản phẩm',
          iconName: 0,
          route: '/business-group/product',
        },
        {
          displayName: 'Quản lý tài sản',
          iconName: 0,
          route: '/business-group/asset',
        },
        {
          displayName: 'Quản lý nhân viên',
          iconName: 0,
          route: '/business-group/employee',
        },
        {
          displayName: 'Quản lý khách hàng',
          iconName: 0,
          route: '/business-group/cutomer',
        },
        {
          displayName: 'Quản lý nhà cung cấp',
          iconName: 0,
          route: '/business-group/supplier',
        },
        {
          displayName: 'Tiền tệ',
          iconName: 0,
          route: '/business-group/currency',
        },
        {
          displayName: 'Bộ sổ',
          iconName: 0,
          route: '/business-group/storybook',
        },
        {
          displayName: 'Biểu thuế - HTTK',
          iconName: 0,
          route: '/business-group/tariff-coa',
          children: [
            {
              displayName: 'Hệ thống tài khoản',
              iconName: 0,
              route: '/business-group/tariff-coa/coa',
            },
            {
              displayName: 'Biểu thuế tiêu thụ đặc biệt',
              iconName: 0,
              route: '/business-group/tariff-coa/excise-tariff',
            },
            {
              displayName: 'Biểu thuế tài nguyên',
              iconName: 0,
              route: '/business-group/tariff-coa/resoure-tariff',
            }
          ]
        },
        {
          displayName: 'Trung tâm chi phí',
          iconName: 0,
          route: '/business-group/cost-center',
        },
        {
          displayName: 'Năm tài chính',
          iconName: 0,
          route: '/business-group/fiscal-year',
        },
        {
          displayName: 'Kỳ kế toán',
          iconName: 0,
          route: '/business-group/accountant-period',
        },
        {
          displayName: 'Quản lý chứng từ',
          iconName: 0,
          route: '/business-group/voucher',
        },
        {
          displayName: 'Phương thức thanh toán',
          iconName: 0,
          route: '/business-group/payment-method',
        },
        {
          displayName: 'Điều khoản thanh toán',
          iconName: 0,
          route: '/business-group/payment-term',
        },
        {
          displayName: 'Quản lý chi nhánh',
          iconName: 0,
          route: '/business-group/legal-entity',
          children: [
            {
              displayName: 'Quản lý nhóm KH',
              iconName: 0,
              route: '/business-group/legal-entity/customer-group',
            },
            {
              displayName: 'Quản lý nhóm NCC',
              iconName: 0,
              route: '/business-group/legal-entity/supplier-group',
            },
            {
              displayName: 'Quản lý nhóm chức vụ',
              iconName: 0,
              route: '/business-group/legal-entity/company-position',
            },
            {
              displayName: 'Quản lý nhóm sản phẩm',
              iconName: 0,
              route: '/business-group/legal-entity/product-group',
            },
            {
              displayName: 'Giá đặc biệt NCC',
              iconName: 0,
              route: '/business-group/legal-entity/special-price-supplier',
            },
            {
              displayName: 'Giá đặc biệt KH',
              iconName: 0,
              route: '/business-group/legal-entity/special-price-customer',
            }
          ]
        },
        {
          displayName: 'Quản lý văn phòng',
          iconName: 0,
          route: '/business-group/division',
        },
        {
          displayName: 'Quản lý phòng ban',
          iconName: 0,
          route: '/business-group/department',
        },
      ],
    },
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

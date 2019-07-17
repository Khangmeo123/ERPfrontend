import { Component, OnInit, Input, HostListener, ElementRef, OnChanges } from '@angular/core';
import { ItemSidebar } from './itemsidebar/itemsidebar.entity';
import { AppService, BookmarkService } from 'src/app/_services';
import { toggleMenuSideBar, toggleMenuNavbar, toggleMenuNavbarLeft } from '../../../_shared/animations/sidebar.animation';

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
      route: '/master-data',
      children: [
        {
          displayName: 'Quản lý nhóm kinh doanh',
          iconName: 0,
          route: '/master-data/business-group',
        },
        {
          displayName: 'Quản lý ngân hàng',
          iconName: 0,
          route: '/master-data/business-group/bank',
        },
        {
          displayName: 'Quản lý sản phẩm',
          iconName: 0,
          route: '/master-data/business-group/product',
        },
        {
          displayName: 'Đơn vị tính sản phẩm',
          iconName: 0,
          route: '/master-data/business-group/unit',
        },
        {
          displayName: 'Quản lý tài sản',
          iconName: 0,
          route: '/master-data/business-group/asset',
        },
        {
          displayName: 'Quản lý nhân viên',
          iconName: 0,
          route: '/master-data/business-group/employee',
        },
        {
          displayName: 'Quản lý khách hàng',
          iconName: 0,
          route: '/master-data/business-group/customer',
        },
        {
          displayName: 'Quản lý nhà cung cấp',
          iconName: 0,
          route: '/master-data/business-group/supplier',
        },
        {
          displayName: 'Tiền tệ',
          iconName: 0,
          route: '/master-data/business-group/currency',
        },
        {
          displayName: 'Chức vụ công việc',
          iconName: 0,
          route: '/master-data/business-group/job-title',
        },
        {
          displayName: 'Cấp bậc chức vụ',
          iconName: 0,
          route: '/master-data/business-group/job-level',
        },
        {
          displayName: '------------------------------',
          iconName: 0,
          route: null,
        },
        {
          displayName: 'Bộ sổ',
          iconName: 0,
          route: '/master-data/sob',
        },
        {
          displayName: 'Tài khoản ngân hàng',
          iconName: 0,
          route: '/master-data/sob/bank-account',
        },
        {
          displayName: 'Hệ thống tài khoản',
          iconName: 0,
          route: '/master-data/sob/coa',
        },
        {
          displayName: 'Biểu thuế tiêu thụ đặc biệt',
          iconName: 0,
          route: '/master-data/sob/excise-tariff',
        },
        {
          displayName: 'Biểu thuế tài nguyên',
          iconName: 0,
          route: '/master-data/sob/resource-tariff',
        },
        {
          displayName: 'Biểu thuế giá trị gia tăng',
          iconName: 0,
          route: '/master-data/sob/value-added-tax',
        },
        {
          displayName: 'Biểu thuế xuất khẩu',
          iconName: 0,
          route: '/master-data/sob/export-tax',
        },

        {
          displayName: 'Biểu thuế nhập khẩu',
          iconName: 0,
          route: '/master-data/sob/import-tax',
        },
        {
          displayName: 'Biểu thuế môi trường',
          iconName: 0,
          route: '/master-data/sob/environment-tax',
        },
        {
          displayName: 'Trung tâm chi phí',
          iconName: 0,
          route: '/master-data/sob/cost-center',
        },
        {
          displayName: 'Năm tài chính',
          iconName: 0,
          route: '/master-data/sob/fiscal-year',
        },
        {
          displayName: 'Kỳ kế toán',
          iconName: 0,
          route: '/master-data/sob/accountant-period',
        },
        {
          displayName: 'Quản lý chứng từ',
          iconName: 0,
          route: '/master-data/sob/voucher',
        },
        {
          displayName: 'Phương thức thanh toán',
          iconName: 0,
          route: '/master-data/sob/payment-method',
        },
        {
          displayName: 'Điều khoản thanh toán',
          iconName: 0,
          route: '/master-data/sob/payment-term',
        },
        {
          displayName: '------------------------------',
          iconName: 0,
          route: null,
        },
        {
          displayName: 'Quản lý chi nhánh',
          iconName: 0,
          route: '/master-data/legal-entity',
        },
        {
          displayName: 'Quản lý nhóm KH',
          iconName: 0,
          route: '/master-data/legal-entity/customer-group',
        },
        {
          displayName: 'Quản lý nhóm NCC',
          iconName: 0,
          route: '/master-data/legal-entity/supplier-group',
        },
        {
          displayName: 'Quản lý nhóm chức vụ',
          iconName: 0,
          route: '/master-data/legal-entity/company-position',
        },
        {
          displayName: 'Quản lý nhóm sản phẩm',
          iconName: 0,
          route: '/master-data/legal-entity/product-group',
        },
        {
          displayName: 'Giá đặc biệt NCC',
          iconName: 0,
          route: '/master-data/legal-entity/special-price-supplier',
        },
        {
          displayName: 'Giá đặc biệt KH',
          iconName: 0,
          route: '/master-data/legal-entity/special-price-customer',
        },
        {
          displayName: '------------------------------',
          iconName: 0,
          route: null,
        },
        {
          displayName: 'Quản lý văn phòng',
          iconName: 0,
          route: '/master-data/division',
        },
        {
          displayName: '------------------------------',
          iconName: 0,
          route: null,
        },
        {
          displayName: 'Quản lý phòng ban',
          iconName: 0,
          route: '/master-data/department',
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
    const element = document.querySelector('.menu-bookmark-line');
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

import { CustomerDetailRepository } from './../customer-detail/customer-detail.repository';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { Router } from '@angular/router';
import { translate } from 'src/app/_helpers/string';
import { CustomerSearchEntity } from 'src/app/_modules/master-data/_backend/customer/customer.searchentity';
import { CustomerEntity } from 'src/app/_modules/master-data/_backend/customer/customer.entity';
import { EnumEntity } from 'src/app/_helpers/entity';
import { Subscription } from 'rxjs';
import { CustomerListService } from './customer-list.service';
import { BookmarkService } from 'src/app/_services';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  providers: [CustomerListService],
})
export class CustomerListComponent implements OnInit, OnDestroy {
  pageTitle: string = translate('customer.list.header.title');
  bookMarkId: string;
  isBookMark: boolean = false;
  isShowDialog: boolean = false;
  pagination: PaginationModel = new PaginationModel();
  // customer
  customerSearchEntity: CustomerSearchEntity = new CustomerSearchEntity();
  customerList: CustomerEntity[];
  // status
  statusList: EnumEntity[];
  customerListSubs: Subscription = new Subscription();
  popoverTitle: string = '';
  popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';
  brands: any[];

  constructor(private customerListService: CustomerListService, private bookmarkService: BookmarkService,
    private router: Router) {
    const customerListSub = this.customerListService.customerList.subscribe(res => {
      if (res) {
        debugger
        this.customerList = res;
      }
    });
    const customerListCountSub = this.customerListService.customerCount.subscribe(res => {
      if (res) {
        this.pagination.totalItems = res;
      }
    });
    const bookMarkNotify = this.bookmarkService.pushItemObs.subscribe(res => {
      this.isBookMark = res;
    });
    const statusListSub = this.customerListService.statusList.subscribe(res => {
      if (res) {
        this.statusList = res;
      }
    });
    this.bookmarkService.checkBookMarks({ name: this.pageTitle, route: this.router.url });
    this.customerListSubs.add(customerListSub).add(customerListCountSub).add(statusListSub).add(bookMarkNotify);
  }

  ngOnInit() {
    this.customerSearchEntity.skip = this.pagination.skip;
    this.customerSearchEntity.take = this.pagination.take;
  }

  ngOnDestroy() {
    this.customerListSubs.unsubscribe();
  }

  toDetail(customerId?: string) {
    this.router.navigate(['/master-data/business-group/customer/customer-detail'], { queryParams: { id: customerId } });
  }

  getList() {
    this.pagination.pageNumber = 1;
    this.customerSearchEntity.skip = 0;
    this.customerSearchEntity.take = this.pagination.take;
    this.customerListService.getList(this.customerSearchEntity);
  }

  paginationOut(pagination: PaginationModel) {
    this.customerSearchEntity.skip = pagination.skip;
    this.customerSearchEntity.take = pagination.take;
    this.customerListService.getList(this.customerSearchEntity);
  }

  clearSearch(table: any) {
    this.customerSearchEntity = new CustomerSearchEntity();
    table.reset();
  }

  sort(event: any) {
    if (event.sortField && event.sortOrder) {
      this.customerSearchEntity.orderBy = event.sortField;
      this.customerSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'dsc';
    }
    this.getList();
  }

  bookMark() {
    this.isBookMark = !this.isBookMark;
    if (this.isBookMark) {
      this.bookmarkService.addBookMarks({ name: this.pageTitle, route: this.router.url });
    } else {
      this.bookmarkService.deleteBookMarks({ name: this.pageTitle, route: this.router.url });
    }
  }

  openStatusList() {
    if (this.statusList.length === 0) {
      this.customerListService.getStatusList();
    }
  }
}

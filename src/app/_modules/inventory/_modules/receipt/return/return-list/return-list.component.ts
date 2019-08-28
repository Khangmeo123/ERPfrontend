import { Component, OnInit } from '@angular/core';
import { translate } from '../../../../../../_helpers/string';
import { Router } from '@angular/router';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { Return } from 'src/app/_modules/inventory/_backend/return/return.entity';
import {
  ReturnSearch,
  EmployeeDetailOfReturnSearch,
  InventoryOrganizationOfReturnSearch
} from 'src/app/_modules/inventory/_backend/return/return.searchentity';
import { Subscription } from 'rxjs';
import { EnumEntity } from 'src/app/_helpers/entity';
import { ReturnListService } from './return-list.service';
import { GeneralService } from 'src/app/_services/general-service.service';
import { BookmarkService } from 'src/app/_services';
import { ReturnRepository } from './return-list.repository';

@Component({
  selector: 'app-return-list',
  templateUrl: './return-list.component.html',
  styleUrls: ['./return-list.component.scss'],
  providers: [ReturnListService],
})
export class ReturnListComponent implements OnInit {
  pageTitle = translate('return.list.header.title');
  pagination: PaginationModel = new PaginationModel();
  isBookMark: boolean = false;
  // return
  returnList: Return[];
  returnSearch: ReturnSearch = new ReturnSearch();
  returnSubs: Subscription = new Subscription();
  // requester:
  requesterSearch: EmployeeDetailOfReturnSearch = new EmployeeDetailOfReturnSearch();
  // inventoryOrganization:
  inventoryOrganizationSearch: InventoryOrganizationOfReturnSearch = new InventoryOrganizationOfReturnSearch();
  // status:
  statusList: EnumEntity[];

  constructor(
    public returnRepository: ReturnRepository,
    private bookmarkService: BookmarkService,
    private generalService: GeneralService,
    private returnService: ReturnListService,
    private router: Router) {

    const returnListSub = this.returnService.returnList.subscribe(res => {
      if (res) {
        this.returnList = res;
      }
    });
    const returnCountSub = this.returnService.returnCount.subscribe(res => {
      if (res) {
        this.pagination.totalItems = res;
      }
    });

    // bookmark:
    const bookMarkNotify = this.bookmarkService.pushItemObs.subscribe(res => {
      this.isBookMark = res;
    });
    this.bookmarkService.checkBookMarks({ name: this.pageTitle, route: this.router.url });

    this.returnSubs.add(returnListSub)
      .add(returnCountSub)
      .add(bookMarkNotify);
  }

  ngOnInit() {
  }

  getList() {
    this.pagination.pageNumber = 1;
    this.returnSearch.skip = 0;
    this.returnSearch.take = this.pagination.take;
    this.returnService.getList(this.returnSearch);
  }

  paginationOut(pagination) {
    this.returnSearch.skip = pagination.skip;
    this.returnSearch.take = pagination.take;
    this.returnService.getList(this.returnSearch);
  }

  clearSearch(table: any) {
    this.returnSearch = new ReturnSearch();
    table.reset();
  }

  sort(event: any) {
    if (event.sortField && event.sortOrder) {
      this.returnSearch.orderBy = event.sortField;
      this.returnSearch.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
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

  addReturn() {
    this.router.navigate(['inventory/receipt/return/return-detail']);
  }

}

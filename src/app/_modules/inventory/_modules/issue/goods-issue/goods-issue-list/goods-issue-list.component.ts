import { Component, OnInit, OnDestroy } from '@angular/core';
import {translate} from '../../../../../../_helpers/string';
import { Router } from '@angular/router';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { Subscription } from 'rxjs';
import { GoodsIssueEntity } from 'src/app/_modules/inventory/_backend/goods-issue/goods-issue.entity';
import {
  GoodsIssueSearchEntity,
  RequesterSearchEntity,
  InventoryOrganizationSearchEntity,
} from 'src/app/_modules/inventory/_backend/goods-issue/goods-issue.searchentity';
import { EnumEntity } from 'src/app/_helpers/entity';
import { GoodsIssueListService } from './goods-issue-list.service';
import { BookmarkService } from 'src/app/_services';
import { GoodsIssueRepository } from './goods-issue-list.repository';

@Component({
  selector: 'app-delivery-order-list',
  templateUrl: './goods-issue-list.component.html',
  styleUrls: ['./goods-issue-list.component.scss'],
  providers: [GoodsIssueListService],
})
export class GoodsIssueListComponent implements OnInit, OnDestroy {
  pageTitle = translate('goodsIssue.list.header.title');
  isBookMark: boolean = false;
  pagination: PaginationModel = new PaginationModel();

  goodsIssueSubs: Subscription = new Subscription();

  // goodsIssue
  goodsIssueList: GoodsIssueEntity[];
  goodsIssueSearchEntity: GoodsIssueSearchEntity = new GoodsIssueSearchEntity();

  // requester:
  requesterSearchEntity: RequesterSearchEntity = new RequesterSearchEntity();

  // inventoryOrganization:
  inventoryOrganizationSearchEntity: InventoryOrganizationSearchEntity = new InventoryOrganizationSearchEntity();

  // status:
  statusList: EnumEntity[];

  constructor(
    private goodsIssueRepository: GoodsIssueRepository,
    private router: Router,
    private goodsIssueService: GoodsIssueListService,
    private bookmarkService: BookmarkService,

    ) {

      // goodsIssue
    const goodsIssueListSub = this.goodsIssueService.goodsIssueList.subscribe(res => {
      if (res) {
        this.goodsIssueList = res;
      }
    });
    const goodsIssueCountSub = this.goodsIssueService.goodsIssueCount.subscribe(res => {
      if (res) {
        this.pagination.totalItems = res;
      }
    });

    // status:
    const statusListSub = this.goodsIssueService.statusList.subscribe(res => {
      if (res) {
        this.statusList = res;
      }
    });
    // bookmark:
    const bookMarkNotify = this.bookmarkService.pushItemObs.subscribe(res => {
      this.isBookMark = res;
    });
    this.bookmarkService.checkBookMarks({name: this.pageTitle, route: this.router.url});

    this.goodsIssueSubs.add(goodsIssueListSub).add(goodsIssueCountSub).add(statusListSub).add(bookMarkNotify);


  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.goodsIssueSubs.unsubscribe();
  }


  openDatePicker(matDatePicker) {
    matDatePicker.open();
  }

  openToDatePicker(matDatePicker) {
    matDatePicker.open();
  }

  getList() {
    this.pagination.pageNumber = 1;
    this.goodsIssueSearchEntity.skip = 0;
    this.goodsIssueSearchEntity.take = this.pagination.take;
    this.goodsIssueService.getList(this.goodsIssueSearchEntity);
  }

  paginationOut(pagination) {
    this.goodsIssueSearchEntity.skip = pagination.skip;
    this.goodsIssueSearchEntity.take = pagination.take;
    this.goodsIssueService.getList(this.goodsIssueSearchEntity);
  }

  clearSearch(table: any) {
    this.goodsIssueSearchEntity = new GoodsIssueSearchEntity();
    table.reset();
  }

  sort(event: any) {
    if (event.sortField && event.sortOrder) {
      this.goodsIssueSearchEntity.orderBy = event.sortField;
      this.goodsIssueSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
    }
    this.getList();
  }

  onFilterInventoryOrganization(inventoryOrganization) {
    this.goodsIssueSearchEntity.inventoryOrganizationId = inventoryOrganization.id;
    this.goodsIssueSearchEntity.inventoryOrganizationCode = inventoryOrganization.code;
    this.getList();
  }

  onFilterStatus(status) {
    this.goodsIssueSearchEntity.statusId = status.id;
    this.goodsIssueSearchEntity.statusName = status.display;
    this.getList();
  }

  onFilterRequester(requester) {
    this.goodsIssueSearchEntity.requesterId = requester.id;
    this.goodsIssueSearchEntity.requesterName = requester.name;
    this.getList();
  }

  bookMark() {
    this.isBookMark = !this.isBookMark;
    if (this.isBookMark) {
      this.bookmarkService.addBookMarks({name: this.pageTitle, route: this.router.url});
    } else {
      this.bookmarkService.deleteBookMarks({name: this.pageTitle, route: this.router.url});
    }
  }

  editdeliveryOrder() {
    this.router.navigate(['inventory/issue/delivery-order/delivery-order-detail']);
  }

  adddeliveryOrder() {
    this.router.navigate(['inventory/issue/deliveryOrder/delivery-order-detail']);
  }

}

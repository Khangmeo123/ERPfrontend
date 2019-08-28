import { Component, OnInit, OnDestroy } from '@angular/core';
import {translate} from '../../../../../../_helpers/string';
import { Router } from '@angular/router';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { Subscription } from 'rxjs';
import { EnumEntity } from 'src/app/_helpers/entity';
import { GoodsIssueListService } from './goods-issue-list.service';
import { BookmarkService } from 'src/app/_services';
import { GoodsIssueRepository } from './goods-issue-list.repository';
import {GoodsIssue} from '../../../../_backend/goods-issue/goods-issue.entity';
import {
  GoodsIssueSearch,
  InventoryOrganizationOfGoodsIssueSearch,
  RequesterOfGoodsIssueSearch
} from '../../../../_backend/goods-issue/goods-issue.searchentity';

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
  goodsIssueList: GoodsIssue[];
  goodsIssueSearchEntity: GoodsIssueSearch = new GoodsIssueSearch();

  // requester:
  requesterSearchEntity: RequesterOfGoodsIssueSearch = new RequesterOfGoodsIssueSearch();

  // inventoryOrganization:
  inventoryOrganizationSearchEntity: InventoryOrganizationOfGoodsIssueSearch = new InventoryOrganizationOfGoodsIssueSearch();

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
    this.goodsIssueSearchEntity = new GoodsIssueSearch();
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

  editGoodsIssue() {
    this.router.navigate(['inventory/issue/goods-issue/goods-issue-detail']);
  }

  addGoodsIssue() {
    this.router.navigate(['inventory/issue/goods-issue/goods-issue-detail']);
  }

}

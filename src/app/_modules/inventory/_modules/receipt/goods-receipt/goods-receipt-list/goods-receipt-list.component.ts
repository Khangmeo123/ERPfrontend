import { Component, OnInit, OnDestroy } from '@angular/core';
import { translate } from '../../../../../../_helpers/string';
import { Router } from '@angular/router';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { Subscription } from 'rxjs';
import { GoodsReceipt } from 'src/app/_modules/inventory/_backend/goods-receipt/goods-receipt.entity';
import {
  GoodsReceiptSearch,
  EmployeeDetailOfGoodsReceiptSearch,
  InventoryOrganizationOfGoodsReceiptSearch,
} from 'src/app/_modules/inventory/_backend/goods-receipt/goods-receipt.searchentity';
import { EnumEntity } from 'src/app/_helpers/entity';
import { GoodsReceiptListService } from './goods-receipt-list.service';
import { GeneralService } from 'src/app/_services/general-service.service';
import { BookmarkService } from 'src/app/_services';
import { GoodsReceiptListRepository } from './goods-receipt-list.repository';

@Component({
  selector: 'app-goods-receipt-list',
  templateUrl: './goods-receipt-list.component.html',
  styleUrls: ['./goods-receipt-list.component.scss'],
})
export class GoodsReceiptListComponent implements OnInit, OnDestroy {
  pageTitle = translate('goodsReceipt.header.title');
  isBookMark: boolean = false;
  pagination: PaginationModel = new PaginationModel();
  // goodReceipt
  goodsReceiptList: GoodsReceipt[];
  goodsReceiptSearch: GoodsReceiptSearch = new GoodsReceiptSearch();
  goodsReceiptSubs: Subscription = new Subscription();
  // requester:
  requesterSearch: EmployeeDetailOfGoodsReceiptSearch = new EmployeeDetailOfGoodsReceiptSearch();
  // inventoryOrganization:
  inventoryOrganizationSearch: InventoryOrganizationOfGoodsReceiptSearch = new InventoryOrganizationOfGoodsReceiptSearch();
  // status:
  statusList: EnumEntity[];

  constructor(
    private goodsReceiptService: GoodsReceiptListService,
    private generalService: GeneralService,
    private bookmarkService: BookmarkService,
    private router: Router,
    public goodsReceiptRepository: GoodsReceiptListRepository,
  ) {
    // goodReceiptPO
    const goodReceiptListSub = this.goodsReceiptService.goodsReceiptList.subscribe(res => {
      if (res) {
        this.goodsReceiptList = res;
      }
    });
    const goodReceiptCountSub = this.goodsReceiptService.goodsReceiptCount.subscribe(res => {
      if (res) {
        this.pagination.totalItems = res;
      }
    });
    // bookmark:
    const bookMarkNotify = this.bookmarkService.pushItemObs.subscribe(res => {
      this.isBookMark = res;
    });
    this.bookmarkService.checkBookMarks({ name: this.pageTitle, route: this.router.url });

    // add subscription:
    this.goodsReceiptSubs.add(goodReceiptListSub)
      .add(goodReceiptCountSub)
      .add(bookMarkNotify);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.goodsReceiptSubs.unsubscribe();
  }

  // goodsReceiptPO:

  getList() {
    this.pagination.pageNumber = 1;
    this.goodsReceiptSearch.skip = 0;
    this.goodsReceiptSearch.take = this.pagination.take;
    this.goodsReceiptService.getList(this.goodsReceiptSearch);
  }

  paginationOut(pagination) {
    this.goodsReceiptSearch.skip = pagination.skip;
    this.goodsReceiptSearch.take = pagination.take;
    this.goodsReceiptService.getList(this.goodsReceiptSearch);
  }

  clearSearch(table: any) {
    this.goodsReceiptSearch = new GoodsReceiptSearch();
    table.reset();
  }

  sort(event: any) {
    if (event.sortField && event.sortOrder) {
      this.goodsReceiptSearch.orderBy = event.sortField;
      this.goodsReceiptSearch.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
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

  addGoodsReceipt() {
    return this.router.navigate(['/inventory/receipt/goods-receipt/goods-receipt-detail']);
  }

}

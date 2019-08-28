import { Component, OnInit, OnDestroy } from '@angular/core';
import {translate} from '../../../../../../_helpers/string';
import { Router } from '@angular/router';
import { BookmarkService } from 'src/app/_services';
import { GoodsReturnListService } from './goods-return-list.service';
import { GoodsReturnRepository } from './goods-return-list.repository';
import { GoodsReturn } from 'src/app/_modules/inventory/_backend/goods-return/goods-return.entity';
import { GoodsReturnSearch, RequesterOfGoodsReturnSearch, InventoryOrganizationOfGoodsReturnSearch } from 'src/app/_modules/inventory/_backend/goods-return/goods-return.searchentity';
import { Subscription } from 'rxjs';
import { EnumEntity } from 'src/app/_helpers/entity';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';

@Component({
  selector: 'app-delivery-order-list',
  templateUrl: './goods-return-list.component.html',
  styleUrls: ['./goods-return-list.component.scss'],
  providers: [GoodsReturnListService]
})
export class GoodsReturnListComponent implements OnInit, OnDestroy {
  pageTitle = translate('goodsReturn.list.header.title');
  isBookMark: boolean = false;
  pagination: PaginationModel = new PaginationModel();

  // GoodsReturn
  goodsReturnList: GoodsReturn[];
  goodsReturnSearch: GoodsReturnSearch = new GoodsReturnSearch();
  goodsReturnSubs: Subscription = new Subscription();

  // requester:
  requesterSearchEntity: RequesterOfGoodsReturnSearch = new RequesterOfGoodsReturnSearch();

  // inventoryOrganization:
  inventoryOrganizationSearchEntity: InventoryOrganizationOfGoodsReturnSearch = new InventoryOrganizationOfGoodsReturnSearch();

  // status:
  statusList: EnumEntity[];
 
  constructor(
    private goodsReturnRepository: GoodsReturnRepository,
    private goodsReturnService: GoodsReturnListService,
    private bookmarkService: BookmarkService,
    private router: Router) {
    // GoodsReturn
    const goodsReturnListSub = this.goodsReturnService.goodsReturnList.subscribe(res => {
      if (res) {
        this.goodsReturnList = res;
      }
    });
    const goodsReturnCountSub = this.goodsReturnService.goodsReturnCount.subscribe(res => {
      if (res) {
        this.pagination.totalItems = res;
      }
    });

    // status:
    const statusListSub = this.goodsReturnService.statusList.subscribe(res => {
      if (res) {
        this.statusList = res;
      }
    });
    // bookmark:
    const bookMarkNotify = this.bookmarkService.pushItemObs.subscribe(res => {
      this.isBookMark = res;
    });
    this.bookmarkService.checkBookMarks({name: this.pageTitle, route: this.router.url});

    this.goodsReturnSubs.add(goodsReturnListSub).add(goodsReturnCountSub).add(statusListSub).add(bookMarkNotify);

    }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.goodsReturnSubs.unsubscribe();
  }

  getList() {
    this.pagination.pageNumber = 1;
    this.goodsReturnSearch.skip = 0;
    this.goodsReturnSearch.take = this.pagination.take;
    this.goodsReturnService.getList(this.goodsReturnSearch);
  }

  paginationOut(pagination) {
    this.goodsReturnSearch.skip = pagination.skip;
    this.goodsReturnSearch.take = pagination.take;
    this.goodsReturnService.getList(this.goodsReturnSearch);
  }

  clearSearch(table: any) {
    this.goodsReturnSearch = new GoodsReturnSearch();
    table.reset();
  }

  sort(event: any) {
    if (event.sortField && event.sortOrder) {
      this.goodsReturnSearch.orderBy = event.sortField;
      this.goodsReturnSearch.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
    }
    this.getList();
  }

  onFilterInventoryOrganization(inventoryOrganization) {
    this.goodsReturnSearch.inventoryOrganizationId = inventoryOrganization.id;
    this.goodsReturnSearch.inventoryOrganizationCode = inventoryOrganization.code;
    this.getList();
  }

  onFilterStatus(status) {
    this.goodsReturnSearch.statusId = status.id;
    this.goodsReturnSearch.statusName = status.display;
    this.getList();
  }

  onFilterRequester(requester) {
    this.goodsReturnSearch.requesterId = requester.id;
    this.goodsReturnSearch.requesterName = requester.name;
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

  addGoodsReturn() {
    this.router.navigate(['inventory/issue/goods-return/goods-return-detail']);
  }


}

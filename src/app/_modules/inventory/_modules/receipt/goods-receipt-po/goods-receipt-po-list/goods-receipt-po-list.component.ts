import {
  GoodsReceiptPORequesterSearchEntity,
  GoodsReceiptPOInventoryOrganizationSearchEntity,
} from './../../../../_backend/goods-receipt-po/goods-receipt-po.searchentity';
import { GoodsReceiptPORequesterEntity } from './../../../../_backend/goods-receipt-po/goods-receipt-po.entity';
import { Subscription, Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { translate } from '../../../../../../_helpers/string';
import { Router } from '@angular/router';
import { GoodsReceiptPOListService } from './goods-receipt-po-list.service';
import { GeneralService } from 'src/app/_helpers/general-service.service';
import { BookmarkService } from 'src/app/_services';
import { GoodsReceiptPOEntity } from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.entity';
import { GoodsReceiptPOSearchEntity } from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.searchentity';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { EnumEntity } from 'src/app/_helpers/entity';

@Component({
  selector: 'app-goods-receipt-po-list',
  templateUrl: './goods-receipt-po-list.component.html',
  styleUrls: ['./goods-receipt-po-list.component.scss'],
  providers: [GoodsReceiptPOListService],
})
export class GoodsReceiptPoListComponent implements OnInit, OnDestroy {
  pageTitle = translate('goodsReceiptPO.header.title');
  isBookMark: boolean = false;
  pagination: PaginationModel = new PaginationModel();
  // goodReceiptPO
  goodsReceiptPOList: GoodsReceiptPOEntity[];
  goodsReceiptPOSearchEntity: GoodsReceiptPOSearchEntity = new GoodsReceiptPOSearchEntity();
  goodsReceiptPOSubs: Subscription = new Subscription();
  // requester:
  requesterIds: GoodsReceiptPORequesterEntity[];
  requesterExceptIds: GoodsReceiptPORequesterEntity[];
  requesterSearchEntity: GoodsReceiptPORequesterSearchEntity = new GoodsReceiptPORequesterSearchEntity();
  requesterTyping: Subject<GoodsReceiptPORequesterSearchEntity> = new Subject();
  // inventoryOrganization:
  inventoryOrganizationIds: GoodsReceiptPORequesterEntity[];
  inventoryOrganizationExceptIds: GoodsReceiptPORequesterEntity[];
  inventoryOrganizationSearchEntity: GoodsReceiptPOInventoryOrganizationSearchEntity =
    new GoodsReceiptPOInventoryOrganizationSearchEntity();
  inventoryOrganizationTyping: Subject<GoodsReceiptPOInventoryOrganizationSearchEntity> = new Subject();
  // status:
  statusList: EnumEntity[];

  constructor(
    private goodsReceiptPOService: GoodsReceiptPOListService,
    private genaralService: GeneralService,
    private bookmarkService: BookmarkService,
    private router: Router) {
    // goodReceiptPO
    const goodReceiptPOListSub = this.goodsReceiptPOService.goodsReceiptPOList.subscribe(res => {
      if (res) {
        this.goodsReceiptPOList = res;
      }
    });
    const goodReceiptPOCountSub = this.goodsReceiptPOService.goodsReceiptPOCount.subscribe(res => {
      if (res) {
        this.pagination.totalItems = res;
      }
    });
    // requester:
    const requesterSub = this.goodsReceiptPOService.requesterList.subscribe(res => {
      if (res) {
        this.requesterIds = res.ids;
        this.requesterExceptIds = res.exceptIds;
      }
    });
    this.goodsReceiptPOService.typingSearchRequester(this.requesterTyping);
    // invetoryOrganization:
    const inventoryOrganizationSub = this.goodsReceiptPOService.inventoryOrganizationList.subscribe(res => {
      if (res) {
        this.inventoryOrganizationIds = res.ids;
        this.inventoryOrganizationExceptIds = res.exceptIds;
      }
    });
    this.goodsReceiptPOService.typingSearchInvetoryOrganization(this.inventoryOrganizationTyping);
    // status:
    const statusListSub = this.goodsReceiptPOService.statusList.subscribe(res => {
      if (res) {
        this.statusList = res;
      }
    });
    // bookmark:
    const bookMarkNotify = this.bookmarkService.pushItemObs.subscribe(res => {
      this.isBookMark = res;
    });
    this.bookmarkService.checkBookMarks({ name: this.pageTitle, route: this.router.url });

    // add subcription:
    this.goodsReceiptPOSubs.add(goodReceiptPOListSub)
      .add(goodReceiptPOCountSub)
      .add(requesterSub)
      .add(inventoryOrganizationSub)
      .add(statusListSub)
      .add(bookMarkNotify);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.goodsReceiptPOSubs.unsubscribe();
  }

  // goodsReceiptPO:

  getList() {
    this.pagination.pageNumber = 1;
    this.goodsReceiptPOSearchEntity.skip = 0;
    this.goodsReceiptPOSearchEntity.take = this.pagination.take;
    this.goodsReceiptPOService.getList(this.goodsReceiptPOSearchEntity);
  }

  paginationOut(pagination: PaginationModel) {
    this.goodsReceiptPOSearchEntity.skip = pagination.skip;
    this.goodsReceiptPOSearchEntity.take = pagination.take;
    this.goodsReceiptPOService.getList(this.goodsReceiptPOSearchEntity);
  }

  clearSearch(table: any) {
    this.goodsReceiptPOSearchEntity = new GoodsReceiptPOSearchEntity();
    table.reset();
  }

  sort(event: any) {
    if (event.sortField && event.sortOrder) {
      this.goodsReceiptPOSearchEntity.orderBy = event.sortField;
      this.goodsReceiptPOSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
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

  editGoodsReceiptPO(goodsReceiptId: string) {
    this.router.navigate(['inventory/receipt/goods-receipt-po/goods-receipt-po-detail'], { queryParams: { id: goodsReceiptId } });
  }

  addGoodsReceipt() {
    this.router.navigate(['inventory/receipt/goods-receipt-po/goods-receipt-po-detail']);
  }

  // requester:
  dropListRequester(id: string) {
    this.requesterSearchEntity = new GoodsReceiptPORequesterSearchEntity();
    if (id !== null && id.length > 0) {
      this.requesterSearchEntity.ids.push(id);
    }
    this.goodsReceiptPOService.dropListRequester(this.requesterSearchEntity);
  }

  typingSearchRequester(event, id) {
    this.requesterSearchEntity = new GoodsReceiptPORequesterSearchEntity();
    if (id !== null && id.length > 0) {
      this.requesterSearchEntity.ids.push(id);
    }
    this.requesterSearchEntity.name.startsWith = event;
    this.requesterTyping.next(this.requesterSearchEntity);
  }

  // inventoryOrganization:
  dropListInventoryOrganization(id: string) {
    this.inventoryOrganizationSearchEntity = new GoodsReceiptPOInventoryOrganizationSearchEntity();
    if (id !== null && id.length > 0) {
      this.inventoryOrganizationSearchEntity.ids.push(id);
    }
    this.goodsReceiptPOService.dropListInvetoryOrganization(this.inventoryOrganizationSearchEntity);
  }

  typingSearchInvetoryOrganization(event: string, id: string) {
    this.inventoryOrganizationSearchEntity = new GoodsReceiptPOInventoryOrganizationSearchEntity();
    if (id !== null && id.length > 0) {
      this.inventoryOrganizationSearchEntity.ids.push(id);
    }
    this.inventoryOrganizationSearchEntity.name.startsWith = event;
    this.inventoryOrganizationTyping.next(this.inventoryOrganizationSearchEntity);
  }

  // status:
  enumListStatus() {
    if (this.statusList.length === 0) {
      this.goodsReceiptPOService.enumListStatus();
    }
  }
}

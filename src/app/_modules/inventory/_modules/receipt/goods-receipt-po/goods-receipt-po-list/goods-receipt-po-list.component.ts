import {
  EmpoloyeeDetailSearchEntity,
  InventoryOrganizationSearchEntity,
} from '../../../../_backend/goods-receipt-po/goods-receipt-po.searchentity';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { translate } from '../../../../../../_helpers/string';
import { Router } from '@angular/router';
import { GoodsReceiptPOListService } from './goods-receipt-po-list.service';
import { GeneralService } from 'src/app/_services/general-service.service';
import { BookmarkService } from 'src/app/_services';
import { GoodsReceiptPOEntity } from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.entity';
import { GoodsReceiptPOSearchEntity } from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.searchentity';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { EnumEntity } from 'src/app/_helpers/entity';
import { EmployeeEntity } from '../../../../../master-data/_backend/employee/employee.entity';
import { InventoryOrganizationEntity } from '../../../../_backend/inventory-organization/inventory-organization.entity';

@Component({
  selector: 'app-goods-receipt-po-list',
  templateUrl: './goods-receipt-po-list.component.html',
  styleUrls: ['./goods-receipt-po-list.component.scss'],
  providers: [GoodsReceiptPOListService],
})
export class GoodsReceiptPOListComponent implements OnInit, OnDestroy {
  pageTitle = translate('goodsReceiptPO.header.title');
  isBookMark: boolean = false;
  pagination: PaginationModel = new PaginationModel();

  // goodReceiptPO
  goodsReceiptPOList: GoodsReceiptPOEntity[];
  goodsReceiptPOSearchEntity: GoodsReceiptPOSearchEntity = new GoodsReceiptPOSearchEntity();
  goodsReceiptPOSubs: Subscription = new Subscription();

  // requester:
  requesterList: EmployeeEntity[] = [];
  requesterSearchEntity: EmpoloyeeDetailSearchEntity = new EmpoloyeeDetailSearchEntity();

  // inventoryOrganization:
  inventoryOrganizationList: InventoryOrganizationEntity[] = [];
  inventoryOrganizationSearchEntity: InventoryOrganizationSearchEntity =
    new InventoryOrganizationSearchEntity();

  // status:
  statusList: EnumEntity[];

  constructor(
    private goodsReceiptPOService: GoodsReceiptPOListService,
    private genaralService: GeneralService,
    private bookmarkService: BookmarkService,
    private router: Router,
  ) {
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
        this.requesterList = res;
      }
    });
    // inventoryOrganization:
    const inventoryOrganizationSub = this.goodsReceiptPOService.inventoryOrganizationList.subscribe(res => {
      if (res) {
        this.inventoryOrganizationList = res;
      }
    });
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
    this.bookmarkService.checkBookMarks({name: this.pageTitle, route: this.router.url});

    // add subscription:
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

  paginationOut(pagination) {
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
      this.bookmarkService.addBookMarks({name: this.pageTitle, route: this.router.url});
    } else {
      this.bookmarkService.deleteBookMarks({name: this.pageTitle, route: this.router.url});
    }
  }

  editGoodsReceiptPO(goodsReceiptId: string) {
    return this.router.navigate(
      ['inventory/receipt/goods-receipt-po/goods-receipt-po-detail'],
      {queryParams: {id: goodsReceiptId}},
    );
  }

  addGoodsReceipt() {
    return this.router.navigate(['inventory/receipt/goods-receipt-po/goods-receipt-po-detail']);
  }

  onFilterInventoryOrganization(event) {
    this.goodsReceiptPOSearchEntity.inventoryOrganizationId = event;
    this.getList();
  }

  onFilterStatus(statusId) {
    this.goodsReceiptPOSearchEntity.statusId = statusId;
    this.getList();
  }

  onFilterRequester(requesterId) {
    this.goodsReceiptPOSearchEntity.requesterId = requesterId;
    this.getList();
  }
}

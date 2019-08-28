import { Component, OnInit, OnDestroy } from '@angular/core';
import { translate } from '../../../../../../_helpers/string';
import { Router } from '@angular/router';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { DeliveryOrderRepository } from './delivery-order-list.repository';
import { BookmarkService } from 'src/app/_services';
import { DeliveryOrderListService } from './delivery-order-list.service';
import { DeliveryOrderSearch, RequesterOfDeliveryOrderSearch, InventoryOrganizationOfDeliveryOrderSearch } from 'src/app/_modules/inventory/_backend/delivery-order/delivery-order.searchentity';
import { DeliveryOrder } from 'src/app/_modules/inventory/_backend/delivery-order/delivery-order.entity';
import { EnumEntity } from 'src/app/_helpers/entity';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-delivery-order-list',
  templateUrl: './delivery-order-list.component.html',
  styleUrls: ['./delivery-order-list.component.scss'],
  providers: [DeliveryOrderListService]
})
export class DeliveryOrderListComponent implements OnInit, OnDestroy {
  pageTitle = translate('deliveryOrder.list.header.title');

  isBookMark: boolean = false;
  pagination: PaginationModel = new PaginationModel();

  // deliveryOrder
  deliveryOrderList: DeliveryOrder[];
  deliveryOrderSearch: DeliveryOrderSearch = new DeliveryOrderSearch();
  deliveryOrderSubs: Subscription = new Subscription();

  // requester:
  requesterSearch: RequesterOfDeliveryOrderSearch = new RequesterOfDeliveryOrderSearch();

  // inventoryOrganization:
  inventoryOrganizationSearch: InventoryOrganizationOfDeliveryOrderSearch = new InventoryOrganizationOfDeliveryOrderSearch();

  // status:
  statusList: EnumEntity[];


  constructor(
    private deliveryOrderListService: DeliveryOrderListService,
    private bookmarkService: BookmarkService,
    private deliveryOrderRepository: DeliveryOrderRepository,
    private router: Router) {
    // deliveryOrder
    const deliveryOrderListSub = this.deliveryOrderListService.deliveryOrderList.subscribe(res => {
      if (res) {
        this.deliveryOrderList = res;
      }
    });
    const deliveryOrderCountSub = this.deliveryOrderListService.deliveryOrderCount.subscribe(res => {
      if (res) {
        this.pagination.totalItems = res;
      }
    });
    // status:
    const statusListSub = this.deliveryOrderListService.statusList.subscribe(res => {
      if (res) {
        this.statusList = res;
      }
    });
    // bookmark:
    const bookMarkNotify = this.bookmarkService.pushItemObs.subscribe(res => {
      this.isBookMark = res;
    });
    this.bookmarkService.checkBookMarks({ name: this.pageTitle, route: this.router.url });

    this.deliveryOrderSubs.add(deliveryOrderListSub).add(deliveryOrderCountSub).add(statusListSub).add(bookMarkNotify);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.deliveryOrderSubs.unsubscribe();
  }


  getList() {
    this.pagination.pageNumber = 1;
    this.deliveryOrderSearch.skip = 0;
    this.deliveryOrderSearch.take = this.pagination.take;
    this.deliveryOrderListService.getList(this.deliveryOrderSearch);
  }

  paginationOut(pagination) {
    this.deliveryOrderSearch.skip = pagination.skip;
    this.deliveryOrderSearch.take = pagination.take;
    this.deliveryOrderListService.getList(this.deliveryOrderSearch);
  }

  clearSearch(table: any) {
    this.deliveryOrderSearch = new DeliveryOrderSearch();
    table.reset();
  }

  sort(event: any) {
    if (event.sortField && event.sortOrder) {
      this.deliveryOrderSearch.orderBy = event.sortField;
      this.deliveryOrderSearch.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
    }
    this.getList();
  }

  onFilterInventoryOrganization(inventoryOrganization) {
    this.deliveryOrderSearch.inventoryOrganizationId = inventoryOrganization.id;
    this.deliveryOrderSearch.inventoryOrganizationCode = inventoryOrganization.code;
    this.getList();
  }

  onFilterStatus(status) {
    this.deliveryOrderSearch.statusId = status.id;
    this.deliveryOrderSearch.statusName = status.display;
    this.getList();
  }

  onFilterRequester(requester) {
    this.deliveryOrderSearch.requesterId = requester.id;
    this.deliveryOrderSearch.requesterName = requester.name;
    this.getList();
  }


  editdeliveryOrder() {
    this.router.navigate(['inventory/issue/delivery/delivery-detail']);
  }

  addDeliveryOrder() {
    this.router.navigate(['inventory/issue/delivery/delivery-detail']);
  }

  bookMark() {
    this.isBookMark = !this.isBookMark;
    if (this.isBookMark) {
      this.bookmarkService.addBookMarks({name: this.pageTitle, route: this.router.url});
    } else {
      this.bookmarkService.deleteBookMarks({name: this.pageTitle, route: this.router.url});
    }
  }

}

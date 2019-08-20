import { Component, OnInit, OnDestroy } from '@angular/core';
import { translate } from '../../../../../../_helpers/string';
import { Router } from '@angular/router';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { InventoryCountingEntity } from 'src/app/_modules/inventory/_backend/inventory-counting/inventory-counting.entity';
import { Subscription, Subject } from 'rxjs';
import {
  InventoryCountingSearchEntity, InventoryOrganizationOfCountingSearchEntity, EmployeeDetailOfCountingSearchEntity,
} from 'src/app/_modules/inventory/_backend/inventory-counting/inventory-counting.searchentity';
import { EnumEntity } from 'src/app/_helpers/entity';
import { InventoryCountingListService } from './inventory-counting-list.service';
import { GeneralService } from 'src/app/_services/general-service.service';
import { BookmarkService } from 'src/app/_services';
import { InventoryCountingListRepository } from './inventory-counting-list.repository';

@Component({
  selector: 'app-goods-receipt-po-list',
  templateUrl: './inventory-counting-list.component.html',
  styleUrls: ['./inventory-counting-list.component.scss'],
  providers: [InventoryCountingListService],
})
export class InventoryCountingListComponent implements OnInit, OnDestroy {
  pageTitle = translate('inventoryCounting.list.header.title');
  isBookMark: boolean = false;
  pagination: PaginationModel = new PaginationModel();
  // inventory counting
  inventoryCountingList: InventoryCountingEntity[];
  inventoryCountingSearchEntity: InventoryCountingSearchEntity = new InventoryCountingSearchEntity();
  inventoryCountingSubs: Subscription = new Subscription();
  // status:
  statusList: EnumEntity[];
  // inventoryOrganization:
  inventoryOrganizationSearch: InventoryOrganizationOfCountingSearchEntity = new InventoryOrganizationOfCountingSearchEntity();
  // employeeDetail:
  inventoryCountingOwnerSearch: EmployeeDetailOfCountingSearchEntity = new EmployeeDetailOfCountingSearchEntity();
  inventoryCounterSearch: EmployeeDetailOfCountingSearchEntity = new EmployeeDetailOfCountingSearchEntity();

  constructor(
    private inventoryCountingListService: InventoryCountingListService,
    private genaralService: GeneralService,
    private bookmarkService: BookmarkService,
    private inventoryCountingListRepository: InventoryCountingListRepository,
    private router: Router) {
    // inventory counting
    const inventoryCountingListSub = this.inventoryCountingListService.inventoryCountingList.subscribe(res => {
      if (res) {
        this.inventoryCountingList = res;
      }
    });
    const inventoryCountingCountSub = this.inventoryCountingListService.inventoryCountingCount.subscribe(res => {
      if (res) {
        this.pagination.totalItems = res;
      }
    });

    // status:
    const statusListSub = this.inventoryCountingListService.statusList.subscribe(res => {
      if (res) {
        this.statusList = res;
      }
    });

    // bookmark:
    const bookMarkNotify = this.bookmarkService.pushItemObs.subscribe(res => {
      this.isBookMark = res;
    });
    this.bookmarkService.checkBookMarks({ name: this.pageTitle, route: this.router.url });

    this.inventoryCountingSubs.add(inventoryCountingListSub)
      .add(inventoryCountingCountSub)
      .add(bookMarkNotify)
      .add(statusListSub);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.inventoryCountingSubs.unsubscribe();
  }

  openDatePicker(matDatePicker) {
    matDatePicker.open();
  }

  openToDatePicker(matDatePicker) {
    matDatePicker.open();
  }

  sort(event: any) {
    if (event.sortField && event.sortOrder) {
      this.inventoryCountingSearchEntity.orderBy = event.sortField;
      this.inventoryCountingSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
    }
    this.getList();
  }

  getList() {
    this.pagination.pageNumber = 1;
    this.inventoryCountingSearchEntity.skip = 0;
    this.inventoryCountingSearchEntity.take = this.pagination.take;
    this.inventoryCountingListService.getList(this.inventoryCountingSearchEntity);
  }

  paginationOut(pagination: PaginationModel) {
    this.inventoryCountingSearchEntity.skip = pagination.skip;
    this.inventoryCountingSearchEntity.take = pagination.take;
    this.inventoryCountingListService.getList(this.inventoryCountingSearchEntity);
  }

  clearSearch(table: any) {
    this.inventoryCountingSearchEntity = new InventoryCountingSearchEntity();
    table.reset();
  }


  editInventoryCounting(inventoryCountingId: string) {
    this.router.navigate(['inventory/counting/inventory-counting/inventory-counting-detail'], { queryParams: { id: inventoryCountingId } });
  }

  addInventoryCounting() {
    this.router.navigate(['inventory/counting/inventory-counting/inventory-counting-detail']);
  }


  bookMark() {
    this.isBookMark = !this.isBookMark;
    if (this.isBookMark) {
      this.bookmarkService.addBookMarks({ name: this.pageTitle, route: this.router.url });
    } else {
      this.bookmarkService.deleteBookMarks({ name: this.pageTitle, route: this.router.url });
    }
  }

  // status:
  enumListStatus() {
    if (this.statusList.length === 0) {
      this.inventoryCountingListService.enumListStatus();
    }
  }
}

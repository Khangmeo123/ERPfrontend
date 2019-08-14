import { Component, OnInit, OnDestroy } from '@angular/core';
import { translate } from '../../../../../../_helpers/string';
import { Router } from '@angular/router';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import {
  InventoryCountingEntity, InventoryOrganizationOfCountingEntity, EmployeeDetailOfCountingEntity,
} from 'src/app/_modules/inventory/_backend/inventory-counting/inventory-counting.entity';
import { Subscription, Subject } from 'rxjs';
import {
  InventoryCountingSearchEntity, InventoryOrganizationOfCountingSearchEntity, EmployeeDetailOfCountingSearchEntity,
} from 'src/app/_modules/inventory/_backend/inventory-counting/inventory-counting.searchentity';
import { EnumEntity } from 'src/app/_helpers/entity';
import { InventoryCountingListService } from './inventory-counting-list.service';
import { GeneralService } from 'src/app/_helpers/general-service.service';
import { BookmarkService } from 'src/app/_services';

@Component({
  selector: 'app-goods-receipt-po-list',
  templateUrl: './inventory-counting-list.component.html',
  styleUrls: ['./inventory-counting-list.component.scss'],
  providers: [InventoryCountingListService]
})
export class InventoryCountingListComponent implements OnInit, OnDestroy {
  pageTitle = translate('inventoryCounting.list.header.title');
  isBookMark: boolean = false;
  pagination: PaginationModel = new PaginationModel();

  // inventory counting
  inventoryCountingList: InventoryCountingEntity[];
  inventoryCountingSearchEntity: InventoryCountingSearchEntity = new InventoryCountingSearchEntity();
  inventoryCountingSubs: Subscription = new Subscription();

  // inventoryOrganization:
  inventoryOrganizationIds: InventoryOrganizationOfCountingEntity[];
  inventoryOrganizationExceptIds: InventoryOrganizationOfCountingEntity[];
  inventoryOrganizationSearchEntity: InventoryOrganizationOfCountingSearchEntity =
    new InventoryOrganizationOfCountingSearchEntity();
  inventoryOrganizationTyping: Subject<InventoryOrganizationOfCountingSearchEntity> = new Subject();
  // status:
  statusList: EnumEntity[];

  // inventoryCountingOwner
  inventoryCountingOwnerIds: EmployeeDetailOfCountingEntity[];
  inventoryCountingOwnerExceptIds: EmployeeDetailOfCountingEntity[];
  inventoryCountingOwnerSearchEntity: EmployeeDetailOfCountingSearchEntity = new EmployeeDetailOfCountingSearchEntity();
  inventoryCountingOwnerTyping: Subject<EmployeeDetailOfCountingSearchEntity> = new Subject();

  // inventoryCounter
  inventoryCounterIds: EmployeeDetailOfCountingEntity[];
  inventoryCounterExceptIds: EmployeeDetailOfCountingEntity[];
  inventoryCounterSearchEntity: EmployeeDetailOfCountingSearchEntity = new EmployeeDetailOfCountingSearchEntity();
  inventoryCounterTyping: Subject<EmployeeDetailOfCountingSearchEntity> = new Subject();


  constructor(
    private inventoryCountingListService: InventoryCountingListService,
    private genaralService: GeneralService,
    private bookmarkService: BookmarkService,
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

    // invetoryOrganization:
    const inventoryOrganizationSub = this.inventoryCountingListService.inventoryOrganizationList.subscribe(res => {
      if (res) {
        this.inventoryOrganizationIds = res.ids;
        this.inventoryOrganizationExceptIds = res.exceptIds;
      }
    });
    this.inventoryCountingListService.typingSearchInvetoryOrganization(this.inventoryOrganizationTyping);

    // inventoryCountingOwner:
    const inventoryCountingOwnerSub = this.inventoryCountingListService.employeeDetailList.subscribe(res => {
      if (res) {
        this.inventoryCountingOwnerIds = res.ids;
        this.inventoryCountingOwnerExceptIds = res.exceptIds;
      }
    });
    this.inventoryCountingListService.typingSearchEmployeeDetail(this.inventoryCountingOwnerTyping);
    // inventoryCounter
    const inventoryCounterSub = this.inventoryCountingListService.employeeDetailList.subscribe(res => {
      if (res) {
        this.inventoryCounterIds = res.ids;
        this.inventoryCounterExceptIds = res.exceptIds;
      }
    });

    this.inventoryCountingListService.typingSearchEmployeeDetail(this.inventoryCounterTyping);

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
      .add(inventoryOrganizationSub)
      .add(statusListSub)
      .add(inventoryCountingOwnerSub)
      .add(inventoryCounterSub);
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
    console.log(event)
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

  // inventoryOrganization:
  dropListInventoryOrganization(id: string) {
    this.inventoryOrganizationSearchEntity = new InventoryOrganizationOfCountingSearchEntity();
    if (id !== null && id.length > 0) {
      this.inventoryOrganizationSearchEntity.ids.push(id);
    }
    this.inventoryCountingListService.dropListInvetoryOrganization(this.inventoryOrganizationSearchEntity);
  }

  typingSearchInvetoryOrganization(event: string, id: string) {
    this.inventoryOrganizationSearchEntity = new InventoryOrganizationOfCountingSearchEntity();
    if (id !== null && id.length > 0) {
      this.inventoryOrganizationSearchEntity.ids.push(id);
    }
    this.inventoryOrganizationSearchEntity.code.startsWith = event;
    this.inventoryOrganizationTyping.next(this.inventoryOrganizationSearchEntity);
  }

  // status:
  enumListStatus() {
    if (this.statusList.length === 0) {
      this.inventoryCountingListService.enumListStatus();
    }
  }

  // inventoryCountingOwner
  dropListInventoryCoutingOwner(id: string) {
    this.inventoryCountingOwnerSearchEntity = new EmployeeDetailOfCountingSearchEntity();
    if (id !== null && id.length > 0) {
      this.inventoryCountingOwnerSearchEntity.ids.push(id);
    }
    this.inventoryCountingListService.dropListEmployeeDetail(this.inventoryCountingOwnerSearchEntity);
  }

  typingSearchInventoryOwner(event: string, id: string) {
    this.inventoryCountingOwnerSearchEntity = new EmployeeDetailOfCountingSearchEntity();
    if (id !== null && id.length > 0) {
      this.inventoryCountingOwnerSearchEntity.ids.push(id);
    }
    this.inventoryCountingOwnerSearchEntity.code.startsWith = event;
    this.inventoryCountingOwnerTyping.next(this.inventoryCountingOwnerSearchEntity);
  }

  // inventoryCountingOwner
  dropListInventoryCouter(id: string) {
    this.inventoryCounterSearchEntity = new EmployeeDetailOfCountingSearchEntity();
    if (id !== null && id.length > 0) {
      this.inventoryCounterSearchEntity.ids.push(id);
    }
    this.inventoryCountingListService.dropListEmployeeDetail(this.inventoryCounterSearchEntity);
  }

  typingSearchInventoryCounter(event: string, id: string) {
    this.inventoryCounterSearchEntity = new EmployeeDetailOfCountingSearchEntity();
    if (id !== null && id.length > 0) {
      this.inventoryCounterSearchEntity.ids.push(id);
    }
    this.inventoryCounterSearchEntity.code.startsWith = event;
    this.inventoryCounterTyping.next(this.inventoryCounterSearchEntity);
  }
}

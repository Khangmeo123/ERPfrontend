import { UnitOfMeasureOfCountingSearchEntity } from './../../../../_backend/inventory-counting/inventory-counting.searchentity';
import { UnitOfMeasureOfCountingEntity } from './../../../../_backend/inventory-counting/inventory-counting.entity';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { translate } from 'src/app/_helpers/string';
import { Router, ActivatedRoute } from '@angular/router';
import { InventoryCountingDetailService } from './inventory-counting-detail.service';
import { GeneralService } from 'src/app/_helpers/general-service.service';
import {
  InventoryOrganizationOfCountingEntity,
  EmployeeDetailOfCountingEntity,
  ItemDetailOfCountingEntity,
} from 'src/app/_modules/inventory/_backend/inventory-counting/inventory-counting.entity';
import {
  InventoryOrganizationOfCountingSearchEntity,
  EmployeeDetailOfCountingSearchEntity,
  ItemDetailOfCountingSearchEntity,
} from 'src/app/_modules/inventory/_backend/inventory-counting/inventory-counting.searchentity';

@Component({
  selector: 'app-goods-receipt-po-detail',
  templateUrl: './inventory-counting-detail.component.html',
  styleUrls: ['./inventory-counting-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [InventoryCountingDetailService],
})
export class InventoryCountingDetailComponent implements OnInit, OnDestroy {
  pageTitle = translate('goodsReceiptDetail.header.title');
  fileNameList: Array<any> = [];
  inventoryCountingSubs: Subscription = new Subscription();
  displayBatch: boolean = false;
  displaySerial: boolean = false;
  employeeListIds: string[] = [];
  inventoryCountingId: string;
  inventoryCountingForm: FormGroup;
  // colFrozen: string[] = [
  //   'inventoryCounting.detail.tab1.no',

  // ];
  // cols: string[] = [
  //   'inventoryCounting.detail.tab1.itemNo',
  //   'inventoryCounting.detail.tab1.itemName',
  //   'inventoryCounting.detail.tab1.unitOfMeasure',
  //   'inventoryCounting.detail.tab1.inventoryCode',
  //   'inventoryCounting.detail.tab1.quantityOfInventory',
  //   'inventoryCounting.detail.tab1.highestDifference',
  // ]
  // inventoryOrganization:
  inventoryOrganizationIds: InventoryOrganizationOfCountingEntity[];
  inventoryOrganizationExceptIds: InventoryOrganizationOfCountingEntity[];
  inventoryOrganizationSearchEntity: InventoryOrganizationOfCountingSearchEntity =
    new InventoryOrganizationOfCountingSearchEntity();
  inventoryOrganizationTyping: Subject<InventoryOrganizationOfCountingSearchEntity> = new Subject();

  // employeeDetail:
  employeeDetailIds: EmployeeDetailOfCountingEntity[];
  employeeDetailExceptIds: EmployeeDetailOfCountingEntity[];
  employeeDetailSearchEntity: EmployeeDetailOfCountingSearchEntity = new EmployeeDetailOfCountingSearchEntity();
  employeeDetailTyping: Subject<EmployeeDetailOfCountingSearchEntity> = new Subject();

  // unitOfMeasure:
  unitOfMeasureIds: UnitOfMeasureOfCountingEntity[];
  unitOfMeasureExceptIds: UnitOfMeasureOfCountingEntity[];
  unitOfMeasureSearchEntity: UnitOfMeasureOfCountingSearchEntity = new UnitOfMeasureOfCountingSearchEntity();
  unitOfMeasureTyping: Subject<UnitOfMeasureOfCountingSearchEntity> = new Subject();

  // itemDetail:
  itemDetailIds: ItemDetailOfCountingEntity[];
  itemDetailExceptIds: ItemDetailOfCountingEntity[];
  itemDetailSearchEntity: ItemDetailOfCountingSearchEntity = new ItemDetailOfCountingSearchEntity();
  itemDetailTyping: Subject<ItemDetailOfCountingSearchEntity> = new Subject();

  constructor(
    private router: Router,
    private inventoryCountingService: InventoryCountingDetailService,
    private generalService: GeneralService,
    private route: ActivatedRoute) {

    this.route.queryParams
      .subscribe(params => {
        if (params.id) {
          this.inventoryCountingId = params.id;
        }
        this.inventoryCountingService.getDetail(params.id).then(res => {
        });
      });
    const inventoryCountingFormSub = this.inventoryCountingService.inventoryCountingForm.subscribe(res => {
      if (res) {
        this.inventoryCountingForm = res;
        const inventoryCounters = this.inventoryCountingForm.get('inventoryCounters').value;
        if (inventoryCounters.length > 0) {
          this.inventoryOrganizationSearchEntity.ids = [...inventoryCounters];
        }
      }
    });
    // employeeDetail:
    const employeeDetailListSub = this.inventoryCountingService.employeeDetailList.subscribe(res => {
      if (res) {
        this.employeeDetailIds = res.ids;
        this.employeeDetailExceptIds = res.exceptIds;
      }
    });
    this.inventoryCountingService.typingSearchEmployeeDetail(this.itemDetailTyping);
    // itemDetail:
    const itemDetailListSub = this.inventoryCountingService.itemDetailList.subscribe(res => {
      if (res) {
        this.itemDetailExceptIds = res.exceptIds;
        this.itemDetailIds = res.ids;
      }
    });
    this.inventoryCountingService.typingSearchItemDetail(this.itemDetailTyping);
    // unitOfMeasure:
    const unitOfMeasureListSub = this.inventoryCountingService.unitOfMeasureList.subscribe(res => {
      if (res) {
        this.unitOfMeasureExceptIds = res.exceptIds;
        this.unitOfMeasureIds = res.ids;
      }
    });
    this.inventoryCountingService.typingSearchUnitOfMeasure(this.unitOfMeasureTyping);
    // inventoryOrganization:
    const inventoryOrganizationListSub = this.inventoryCountingService.inventoryOrganizationList.subscribe(res => {
      if (res) {
        this.inventoryOrganizationIds = res.ids;
        this.inventoryOrganizationExceptIds = res.exceptIds;
      }
    });
    this.inventoryCountingService.typingSearchInvetoryOrganization(this.inventoryOrganizationTyping);

    this.inventoryCountingSubs.add(inventoryCountingFormSub)
      .add(employeeDetailListSub)
      .add(itemDetailListSub)
      .add(unitOfMeasureListSub)
      .add(inventoryOrganizationListSub);

  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.inventoryCountingSubs.unsubscribe();
  }

  // general:
  readURL(event: any) {
    for (const item of event.srcElement.files) {
      this.fileNameList.push(item.name);
    }
  }

  trackByFn(index, row) {
    return index;
  }

  backToList() {
    this.router.navigate(['/inventory/receipt/goods-receipt/goods-receipt-list']);
  }

  showBatches() {
    this.displayBatch = true;
  }

  showSerial() {
    this.displaySerial = true;
  }

  delete() {

  }

  save() {
    this.inventoryCountingService.save(this.inventoryCountingForm.value).then(res => {
      this.backToList();
    });
  }

  // inventoryCoutingContents:
  addInventoryCountingContent() {
    this.inventoryCountingService.addInventoryCountingContent();
  }

  selectInventoryCountingContent() {
    console.log(this.inventoryCountingForm.value);
    debugger
  }

  deleteMultiple() {
    this.inventoryCountingService.deleteMultiple(this.inventoryCountingForm);
  }

  // inventoryOrganization:
  dropListInventoryOrganization(id: string) {
    this.inventoryOrganizationSearchEntity = new InventoryOrganizationOfCountingSearchEntity();
    if (id !== null && id.length > 0) {
      this.inventoryOrganizationSearchEntity.ids.push(id);
    }
    this.inventoryCountingService.dropListInvetoryOrganization(this.inventoryOrganizationSearchEntity);
  }

  typingSearchInvetoryOrganization(event: string, id: string) {
    this.inventoryOrganizationSearchEntity = new InventoryOrganizationOfCountingSearchEntity();
    if (id !== null && id.length > 0) {
      this.inventoryOrganizationSearchEntity.ids.push(id);
    }
    this.inventoryOrganizationSearchEntity.code.startsWith = event;
    this.inventoryOrganizationTyping.next(this.inventoryOrganizationSearchEntity);
  }

  // employeeDetail
  dropListEmployeeDetail() {
    this.employeeDetailSearchEntity = new EmployeeDetailOfCountingSearchEntity();
    if (this.employeeListIds !== null && this.employeeListIds.length > 0) {
      this.employeeDetailSearchEntity.ids = [...this.employeeListIds];
    }
    this.inventoryCountingService.dropListEmployeeDetail(this.employeeDetailSearchEntity);
  }

  typingSearchEmployeeDetail(event: string) {
    this.employeeDetailSearchEntity = new EmployeeDetailOfCountingSearchEntity();
    if (this.employeeListIds !== null && this.employeeListIds.length > 0) {
      this.employeeDetailSearchEntity.ids = [...this.employeeListIds];
    }
    this.employeeDetailSearchEntity.name.startsWith = event;
    this.employeeDetailTyping.next(this.employeeDetailSearchEntity);
  }

  selectEmployee(event) {
    this.employeeListIds = [...event];
    this.inventoryCountingService.selectEmployee(this.inventoryCountingForm, this.employeeListIds);
  }

  // unitOfMeasure:
  dropListUnitOfMeasure(id: string) {
    this.unitOfMeasureSearchEntity = new UnitOfMeasureOfCountingSearchEntity();
    if (id !== null && id.length > 0) {
      this.unitOfMeasureSearchEntity.ids.push(id);
    }
    this.inventoryCountingService.dropListUnitOfMeasure(this.unitOfMeasureSearchEntity);
  }

  typingSearchUnitOfMeasure(event: string, id: string) {
    this.unitOfMeasureSearchEntity = new UnitOfMeasureOfCountingSearchEntity();
    if (id !== null && id.length > 0) {
      this.unitOfMeasureSearchEntity.ids.push(id);
    }
    this.unitOfMeasureSearchEntity.name.startsWith = event;
    this.unitOfMeasureTyping.next(this.unitOfMeasureSearchEntity);
  }

  // itemDetail
  dropListItemDetail(id: string) {
    this.itemDetailSearchEntity = new ItemDetailOfCountingSearchEntity();
    if (id !== null && id.length > 0) {
      this.itemDetailSearchEntity.ids.push(id);
    }
    this.inventoryCountingService.dropListItemDetail(this.itemDetailSearchEntity);
  }

  typingSearchItemDetail(event: string, id: string) {
    this.itemDetailSearchEntity = new ItemDetailOfCountingSearchEntity();
    if (id !== null && id.length > 0) {
      this.itemDetailSearchEntity.ids.push(id);
    }
    this.itemDetailSearchEntity.name.startsWith = event;
    this.itemDetailTyping.next(this.itemDetailSearchEntity);
  }

}

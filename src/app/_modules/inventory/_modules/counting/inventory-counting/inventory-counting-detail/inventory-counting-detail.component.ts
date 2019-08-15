import { UnitOfMeasureOfCountingSearchEntity } from './../../../../_backend/inventory-counting/inventory-counting.searchentity';
import { UnitOfMeasureOfCountingEntity, BinLocationOfInventoryCountingEntity } from './../../../../_backend/inventory-counting/inventory-counting.entity';
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
  displayBinLocation: boolean = false;
  displayDetailDifference: boolean = false;
  displayItemDetail: boolean = false;
  employeeListIds: string[] = [];
  inventoryCountingId: string;
  inventoryCountingForm: FormGroup;
  inventoryOrganizationId: string;
  binLocationList: BinLocationOfInventoryCountingEntity[];
  itemDetailList: ItemDetailOfCountingEntity[];
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

  // itemDetailCode:
  itemDetailCodeIds: ItemDetailOfCountingEntity[];
  itemDetailCodeExceptIds: ItemDetailOfCountingEntity[];
  itemDetailCodeSearchEntity: ItemDetailOfCountingSearchEntity = new ItemDetailOfCountingSearchEntity();
  itemDetailCodeTyping: Subject<ItemDetailOfCountingSearchEntity> = new Subject();

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
        const inventoryCountingContents = this.inventoryCountingForm.get('inventoryCountingContents').value;
        if (inventoryCounters.length > 0) {
          this.inventoryOrganizationSearchEntity.ids = [...inventoryCounters];
        }
        if (inventoryCountingContents.length === 0) {
          this.inventoryCountingService.addInventoryCountingContent(this.inventoryCountingForm);
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
    this.inventoryCountingService.typingSearchEmployeeDetail(this.employeeDetailTyping);
    // itemDetailExtendList:
    const itemDetailExtendListSub = this.inventoryCountingService.itemDetailExtendList.subscribe(res => {
      if (res) {
        this.itemDetailList = res;
      }
    });
    // itemDetail:
    const itemDetailListSub = this.inventoryCountingService.itemDetailList.subscribe(res => {
      if (res) {
        this.itemDetailExceptIds = res.exceptIds;
        this.itemDetailIds = res.ids;
      }
    });
    this.inventoryCountingService.typingSearchItemDetail(this.itemDetailTyping);
    // itemDetailCode:
    const itemDetailCodeListSub = this.inventoryCountingService.itemDetailCodeList.subscribe(res => {
      if (res) {
        this.itemDetailCodeExceptIds = res.exceptIds;
        this.itemDetailCodeIds = res.ids;
      }
    });
    this.inventoryCountingService.typingSearchItemDetailCode(this.itemDetailCodeTyping);
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
    // binlocation:
    const binLocationListSub = this.inventoryCountingService.binLocationList.subscribe(res => {
      if (res) {
        this.binLocationList = res;
      }
    });
    this.inventoryCountingSubs.add(inventoryCountingFormSub)
      .add(employeeDetailListSub)
      .add(itemDetailListSub)
      .add(unitOfMeasureListSub)
      .add(inventoryOrganizationListSub)
      .add(itemDetailCodeListSub)
      .add(binLocationListSub)
      .add(itemDetailExtendListSub);
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

  returnNode(node) {
    return node;
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
    debugger;
    if (!this.inventoryCountingForm.valid) {
      this.generalService.validateAllFormFields(this.inventoryCountingForm);
    } else {
      this.inventoryCountingService.save(this.inventoryCountingForm.value).then(res => {
        this.backToList();
      });
    }
  }

  // inventoryCoutingContents:
  addInventoryCountingContent() {
    this.inventoryCountingService.addInventoryCountingContent(this.inventoryCountingForm);
  }

  selectItemDetail(index: number, itemDetail: any) {
    this.inventoryCountingService.selectItemDetail(this.inventoryCountingForm, index, itemDetail);
  }

  checkAllContents(target: any) {
    this.inventoryCountingService.checkAllContents(this.inventoryCountingForm, target.checked);
  }

  deleteMultiple() {
    this.inventoryCountingService.deleteMultiple(this.inventoryCountingForm);
  }

  openBinLocation(inventoryCountingContent: string) {
    this.displayBinLocation = true;
    this.inventoryCountingService.getListBinLocation(this.inventoryOrganizationId, inventoryCountingContent);
  }

  openItemDetail() {
    const data = this.inventoryCountingForm.get('inventoryCountingContents').value;
    this.inventoryCountingService.getItemDetailList(data);
  }

  checkAllItemDetail(target: any) {
    this.inventoryCountingService.checkAllItemDetail(target.checked, this.itemDetailList);
  }

  saveItemDetail() {
    this.inventoryCountingService.saveItemDetail(this.inventoryCountingForm, this.itemDetailList);
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

  selectInventoryOrganization(inventoryOrganizationId: string) {
    this.inventoryCountingForm.get('inventoryOrganizationId').setValue(inventoryOrganizationId);
    this.inventoryOrganizationId = inventoryOrganizationId;
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
    this.itemDetailSearchEntity.inventoryOrganizationId = this.inventoryOrganizationId;
    this.inventoryCountingService.dropListItemDetail(this.itemDetailSearchEntity);
  }

  typingSearchItemDetail(event: string, id: string) {
    this.itemDetailSearchEntity = new ItemDetailOfCountingSearchEntity();
    if (id !== null && id.length > 0) {
      this.itemDetailSearchEntity.ids.push(id);
    }
    this.itemDetailSearchEntity.inventoryOrganizationId = this.inventoryOrganizationId;
    this.itemDetailSearchEntity.name.startsWith = event;
    this.itemDetailTyping.next(this.itemDetailSearchEntity);
  }

  // itemDetailCode
  dropListItemDetailCode(id: string) {
    this.itemDetailCodeSearchEntity = new ItemDetailOfCountingSearchEntity();
    if (id !== null && id.length > 0) {
      this.itemDetailCodeSearchEntity.ids.push(id);
    }
    this.inventoryCountingService.dropListItemDetailCode(this.itemDetailCodeSearchEntity);
  }

  typingSearchItemDetailCode(event: string, id: string) {
    this.itemDetailCodeSearchEntity = new ItemDetailOfCountingSearchEntity();
    if (id !== null && id.length > 0) {
      this.itemDetailCodeSearchEntity.ids.push(id);
    }
    this.itemDetailCodeSearchEntity.name.startsWith = event;
    this.itemDetailCodeTyping.next(this.itemDetailCodeSearchEntity);
  }

  openDetailDifference() {
    this.displayDetailDifference = true;
  }

}

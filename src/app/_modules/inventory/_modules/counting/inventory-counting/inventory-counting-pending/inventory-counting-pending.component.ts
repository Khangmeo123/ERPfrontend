import {
  UnitOfMeasureOfCountingSearchEntity,
  InventoryCounterDetailSearchEntity,
  SerialNumberSearchEntity,
  BatchSearchEntity,
} from './../../../../_backend/inventory-counting/inventory-counting.searchentity';
import {
  UnitOfMeasureOfCountingEntity,
  BinLocationOfInventoryCountingEntity,
  SerialNumberOfInventoryCountingEntity,
  BatchOfInventoryCountingEntity,
} from './../../../../_backend/inventory-counting/inventory-counting.entity';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { translate } from 'src/app/_helpers/string';
import { Router, ActivatedRoute } from '@angular/router';
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
import { InventoryCountingPendingService } from './inventory-counting-pending.service';
import { ColumnEntity } from 'src/app/_helpers/entity';

@Component({
  selector: 'app-inventory-counting-pending',
  templateUrl: './inventory-counting-pending.component.html',
  styleUrls: ['./inventory-counting-pending.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [InventoryCountingPendingService],
})
export class InventoryCountingPendingComponent implements OnInit, OnDestroy {
  pageTitle = translate('goodsReceiptDetail.header.title');
  fileNameList: Array<any> = [];
  inventoryCountingSubs: Subscription = new Subscription();
  displayBatch: boolean = false;
  displaySerial: boolean = false;
  displayBinLocation: boolean = false;
  displayInventoryCounter: boolean = false;
  employeeListIds: string[] = [];
  inventoryCountingId: string;
  inventoryCountingForm: FormGroup;
  inventoryOrganizationId: string;
  itemDetailId: string;
  inventoryCounterContentId: string;
  binLocationList: BinLocationOfInventoryCountingEntity[];
  inventoryCounterDetailSearchEntity: InventoryCounterDetailSearchEntity = new InventoryCounterDetailSearchEntity();
  activeScanOutSide: boolean = false;
  activeScan: boolean = false;
  inventoryCounters: any[] = [];
  inventoryCounterList: any[];
  // serialNumber:
  serialNumber: string;
  serialNumberSearchEntity: SerialNumberSearchEntity = new SerialNumberSearchEntity();
  serialNumberList: SerialNumberOfInventoryCountingEntity[];
  linkSerialNumberTemplate: string = null;
  linkSerialNumberExport: string = null;

  // batch:
  batchCode: string;
  batchSearchEntity: BatchSearchEntity = new BatchSearchEntity();
  batchList: BatchOfInventoryCountingEntity[];
  linkBatchTemplate: string;
  linkBatchExport: string;

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
    private inventoryCountingService: InventoryCountingPendingService,
    private generalService: GeneralService,
    private route: ActivatedRoute) {

    this.route.queryParams
      .subscribe(params => {
        if (params.id) {
          this.inventoryCountingId = params.id;
        }
        this.inventoryCountingService.getDetail(params.id).then(res => {
          if (res) {
            this.inventoryCounters = [...res.inventoryCounters];
          }
        });
      });
    const inventoryCountingFormSub = this.inventoryCountingService.inventoryCountingForm.subscribe(res => {
      if (res) {
        this.inventoryCountingForm = res;
        this.inventoryOrganizationId = this.inventoryCountingForm.get('inventoryOrganizationId').value;

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
    // serialNumber:
    const serialNumberListSub = this.inventoryCountingService.serialNumberList.subscribe(res => {
      if (res) {
        this.serialNumberList = res;
      }
    });
    // batch:
    const batchListSub = this.inventoryCountingService.batchList.subscribe(res => {
      if (res) {
        this.batchList = res;
      }
    });
    // inventoryCounterList:
    const inventoryCounterListSub = this.inventoryCountingService.inventoryCounterList.subscribe(res => {
      if (res) {
        this.inventoryCounterList = res;
      }
    });

    this.inventoryCountingSubs.add(inventoryCountingFormSub)
      .add(itemDetailListSub)
      .add(unitOfMeasureListSub)
      .add(inventoryOrganizationListSub)
      .add(itemDetailCodeListSub)
      .add(binLocationListSub)
      .add(serialNumberListSub)
      .add(batchListSub)
      .add(inventoryCounterListSub);
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.inventoryCountingSubs.unsubscribe();
  }

  // general:
  sortDate(event: string, table: any, field: string) {
    const date = event.replace(/\//g, '-') + 'T00:00:00';
    table.filter(date, field, 'equals');
  }

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

  delete() {

  }

  save() {
    if (!this.inventoryCountingForm.valid) {
      this.generalService.validateAllFormFields(this.inventoryCountingForm);
    } else {
      this.inventoryCountingService.save(this.inventoryCountingForm.value).then(res => {
        this.backToList();
      });
    }
  }

  // inventoryCouterContents:
  openBinLocation(inventoryCountingContent: string) {
    this.displayBinLocation = true;
    this.inventoryCountingService.getListBinLocation(this.inventoryOrganizationId, inventoryCountingContent);
  }

  inputCodeOutside(event) {
    this.inventoryCountingService.analyzeCodeOutSide(this.inventoryCountingId, event);
  }

  clearUnitOfMeasure(table: any) {
    table.filter('', 'unitOfMeasureId', 'contains');
  }

  clearItemDetailId(table: any) {
    table.filter('', 'itemDetailId', 'contains');
  }

  // serialNumber:
  showSerial(itemDetailId: string) {
    this.displaySerial = true;
    this.activeScan = false;
    this.itemDetailId = itemDetailId;
    this.inventoryCountingService.getListSerialNumber(this.itemDetailId, this.inventoryCountingId);
  }

  deleteSerialNumber(serialNumberId: string) {
    this.inventoryCountingService.deleteSerialNumber(serialNumberId, this.itemDetailId, this.inventoryCountingId);
  }

  checkAllSerialNumber(target: any) {
    this.inventoryCountingService.checkAllSerialNumber(target.checked, this.serialNumberList);
  }

  deleteMultipleSerialNumber() {
    this.inventoryCountingService.deleteMultipleSerialNumber(this.serialNumberList, this.itemDetailId, this.inventoryCountingId);
  }

  inputSerialNumber(event) {
    this.inventoryCountingService.analyzeSerialCode(this.itemDetailId, event);
    this.serialNumber = null;
  }

  importSerialNumber(file: File) {
    this.inventoryCountingService.importSerialNumber(file, this.itemDetailId, this.inventoryCountingId);
  }

  clearSerialNumberTable(table) {
    this.serialNumberSearchEntity = new SerialNumberSearchEntity();
    table.reset();
  }

  // batch:
  showBatch(itemDetailId: string) {
    this.displayBatch = true;
    this.activeScan = false;
    this.itemDetailId = itemDetailId;
    this.inventoryCountingService.getListBatch(itemDetailId, this.inventoryCountingId);
  }

  deleteBatch(batchId: string) {
    this.inventoryCountingService.deleteBatch(batchId, this.itemDetailId, this.inventoryCountingId);
  }

  inputBatchCode(event: string) {
    this.inventoryCountingService.analyzeBatchCode(this.itemDetailId, event);
    this.batchCode = null;
  }

  updateBatch(batch: BatchOfInventoryCountingEntity) {
    this.inventoryCountingService.updateBatch(batch);
  }

  // invetoryCounterDetail:
  showInventoryCounterDetail(item: any) {
    this.displayInventoryCounter = true;
    this.inventoryCountingService.getListInventoryCounter(item.id);
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
}

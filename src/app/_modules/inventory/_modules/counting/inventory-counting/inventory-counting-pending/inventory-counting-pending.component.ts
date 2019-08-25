import {
  UnitOfMeasureOfCountingSearchEntity,
  InventoryCounterDetailSearchEntity,
  SerialNumberSearchEntity,
  BatchSearchEntity,
} from './../../../../_backend/inventory-counting/inventory-counting.searchentity';
import {
  BinLocationOfInventoryCountingEntity,
  CounterContentByItemDetailEntity,
} from './../../../../_backend/inventory-counting/inventory-counting.entity';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { translate } from 'src/app/_helpers/string';
import { Router, ActivatedRoute } from '@angular/router';
import {
  InventoryOrganizationOfCountingSearchEntity,
  EmployeeDetailOfCountingSearchEntity,
  ItemDetailOfCountingSearchEntity,
} from 'src/app/_modules/inventory/_backend/inventory-counting/inventory-counting.searchentity';
import { InventoryCountingPendingService } from './inventory-counting-pending.service';
import { environment } from 'src/environments/environment';
import { GeneralService } from 'src/app/_services/general-service.service';
import { InventoryCountingPendingRepository } from './inventory-counting-pending.repository';
import { ToastrService } from 'ngx-toastr';

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
  qrCodeOutSide: string;
  legalEntityId = localStorage.getItem('legalEntityId') || null;
  // serialNumber:
  serialNumber: string;
  serialNumberSearchEntity: SerialNumberSearchEntity = new SerialNumberSearchEntity();
  serialNumberList: CounterContentByItemDetailEntity[];
  linkSerialNumberTemplate: string = environment.apiUrlInv +
    'inventory/counting/inventory-counting/inventory-counting-pending/serial-number/download-template';
  baseLinkSerialNumberExport: string = environment.apiUrlInv +
    'inventory/counting/inventory-counting/inventory-counting-pending/serial-number/export';
  linkSerialNumberExport: string;
  baseLinkCounterExport: string = environment.apiUrlInv +
    'inventory/counting/inventory-counting/inventory-counting-pending/export-by-counter';
  linkCounterExport: string;
  baseLinkCountingExport: string = environment.apiUrlInv +
    'inventory/counting/inventory-counting/inventory-counting-pending/export-counting-content';
  linkCountingExport: string;
  // batchDetail:
  batchCode: string;
  batchSearchEntity: BatchSearchEntity = new BatchSearchEntity();
  batchList: CounterContentByItemDetailEntity[];

  // inventoryOrganization:
  inventoryOrganizationSearchEntity: InventoryOrganizationOfCountingSearchEntity =
    new InventoryOrganizationOfCountingSearchEntity();
  // employeeDetail:
  employeeDetailSearchEntity: EmployeeDetailOfCountingSearchEntity = new EmployeeDetailOfCountingSearchEntity();
  // unitOfMeasure:
  unitOfMeasureSearchEntity: UnitOfMeasureOfCountingSearchEntity = new UnitOfMeasureOfCountingSearchEntity();
  // itemDetail:
  itemDetailSearchEntity: ItemDetailOfCountingSearchEntity = new ItemDetailOfCountingSearchEntity();
  // itemDetailCode:
  itemDetailCodeOfBatchSearch: ItemDetailOfCountingSearchEntity = new ItemDetailOfCountingSearchEntity();
  itemDetailCodeOfSerialSearch: ItemDetailOfCountingSearchEntity = new ItemDetailOfCountingSearchEntity();
  itemDetailCodeOfCounterSearch: ItemDetailOfCountingSearchEntity = new ItemDetailOfCountingSearchEntity();
  itemDetailCodeOfCountingSearch: ItemDetailOfCountingSearchEntity = new ItemDetailOfCountingSearchEntity();

  constructor(
    private router: Router,
    private inventoryCountingService: InventoryCountingPendingService,
    private generalService: GeneralService,
    private toastrService: ToastrService,
    public inventoryCountingRepository: InventoryCountingPendingRepository,
    private route: ActivatedRoute) {
    this.route.queryParams
      .subscribe(params => {
        if (params.id) {
          this.inventoryCountingId = params.id;
          const queryParams = `?InventoryCountingId=${this.inventoryCountingId}&LegalEntityId=af81fee4-b4df-46f8-aaee-be97425be15c`;
          this.linkCounterExport = this.baseLinkCounterExport + queryParams;
          this.linkCountingExport = this.baseLinkCountingExport + queryParams;
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
    // batchDetail:
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
    this.router.navigate(['/inventory/counting/inventory-counting/inventory-counting-list']);
  }

  save() {
    this.toastrService.success('Hệ thống cập nhật thành công !');
    this.backToList();
  }

  send() {
    this.inventoryCountingService.send(this.inventoryCountingId).then(res => {
      this.backToList();
    });
  }

  changeItemDetailCode(event, table) {
    if (event === null) {
      table.filter('', 'itemDetailId', 'contains');
    } else {
      table.filter(event, 'itemDetailId', 'equals');
    }
  }

  changeUnitOfMeasure(event, table) {
    if (event === null) {
      table.filter('', 'itemDetailUnitOfMeasureId', 'contains');
    } else {
      table.filter(event, 'itemDetailUnitOfMeasureId', 'equals');
    }
  }

  // inventoryCouterContents:
  openBinLocation(itemDetailId: string) {
    this.displayBinLocation = true;
    this.inventoryCountingService.getListBinLocation(this.inventoryOrganizationId, itemDetailId);
  }

  inputCodeOutside(event) {
    this.inventoryCountingService.analyzeCodeOutSide(this.inventoryCountingId, event.trim());
    this.qrCodeOutSide = null;
  }

  updateQuantity(itemDetailId: string, quantity: number) {
    this.inventoryCountingService.updateQuantity(this.inventoryCountingId, itemDetailId, Number(quantity));
  }

  // serialNumber:
  showSerial(itemDetailId: string) {
    const queryParams = `?InventoryCountingId=${this.inventoryCountingId}&ItemDetailId=${itemDetailId}&X-LegalEntity=${this.legalEntityId}`;
    this.linkSerialNumberExport = this.baseLinkSerialNumberExport + queryParams;
    this.displaySerial = true;
    this.activeScan = false;
    this.itemDetailId = itemDetailId;
    this.inventoryCountingService.getListSerialNumber(this.itemDetailId, this.inventoryCountingId);
  }

  deleteSerialNumber(serialNumberId: string) {
    this.inventoryCountingService.deleteSerialNumber(serialNumberId, this.itemDetailId, this.inventoryCountingId);
  }

  deleteMultipleSerialNumber() {
    this.inventoryCountingService.deleteMultipleSerialNumber(this.serialNumberList, this.itemDetailId, this.inventoryCountingId);
  }

  checkAllSerialNumber(target: any) {
    this.inventoryCountingService.checkAllSerialNumber(target.checked, this.serialNumberList);
  }

  inputSerialNumber(event) {
    this.inventoryCountingService.analyzeSerialCode(this.itemDetailId, this.inventoryCountingId, event.trim());
    this.serialNumber = null;
  }

  importSerialNumber(file: File) {
    this.inventoryCountingService.importSerialNumber(file, this.itemDetailId, this.inventoryCountingId);
  }

  saveSerialNumber() {
    this.inventoryCountingService.saveSerialNumber(this.inventoryCountingForm, this.serialNumberList);
    this.displaySerial = false;
  }

  clearSerialNumberTable(table) {
    this.serialNumberSearchEntity = new SerialNumberSearchEntity();
    table.reset();
  }

  // batchDetail:
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
    this.inventoryCountingService.analyzeBatchCode(this.itemDetailId, this.inventoryCountingId, event);
    this.batchCode = null;
  }

  updateBatch(batch: CounterContentByItemDetailEntity) {
    this.inventoryCountingService.updateBatch(batch);
  }

  saveBatch() {
    this.inventoryCountingService.saveBatch(this.inventoryCountingForm, this.batchList);
    this.displayBatch = false;
  }

  clearBatchTable(table) {
    this.serialNumberSearchEntity = new SerialNumberSearchEntity();
    table.reset();
  }

  // invetoryCounterDetail:
  showInventoryCounterDetail(item: any) {
    this.displayInventoryCounter = true;
    this.inventoryCountingService.getListInventoryCounter(this.inventoryCountingId, item.id);
  }

  resetInventoryCounterContent() {
    this.inventoryCountingService.resetInventoryCounterContent(this.inventoryCountingId, this.inventoryCountingForm);
  }

  // inventoryOrganization:
  selectInventoryOrganization(inventoryOrganizationId: string) {
    this.inventoryCountingForm.get('inventoryOrganizationId').setValue(inventoryOrganizationId);
    this.inventoryOrganizationId = inventoryOrganizationId;
  }
}

import {
  BinLocationOfInventoryCountingEntity,
} from './../../../../_backend/inventory-counting/inventory-counting.entity';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { Component, OnInit, ViewEncapsulation, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { translate } from 'src/app/_helpers/string';
import { Router, ActivatedRoute } from '@angular/router';
import { InventoryCountingDetailService } from './inventory-counting-detail.service';
import {
  EmployeeDetailOfCountingEntity,
  ItemDetailOfCountingEntity,
} from 'src/app/_modules/inventory/_backend/inventory-counting/inventory-counting.entity';
import {
  InventoryOrganizationOfCountingSearchEntity,
  EmployeeDetailOfCountingSearchEntity,
  ItemDetailOfCountingSearchEntity,
  UnitOfMeasureOfCountingSearchEntity,
} from 'src/app/_modules/inventory/_backend/inventory-counting/inventory-counting.searchentity';
import { GeneralService } from 'src/app/_services/general-service.service';
import { InventoryCountingDetailRepository } from './inventory-counting-detail.repository';

@Component({
  selector: 'app-inventory-counting-detail',
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
  displayItemDetail: boolean = false;
  employeeList: any[] = [];
  employeeListIds: string[] = [];
  inventoryCountingId: string;
  inventoryCountingForm: FormGroup;
  inventoryOrganizationId: string;
  existedIds: string[] = [];
  binLocationList: BinLocationOfInventoryCountingEntity[];
  itemDetailList: ItemDetailOfCountingEntity[];
  checkAllItem: boolean;
  // inventoryOrganization:
  inventoryOrganizationSearchEntity: InventoryOrganizationOfCountingSearchEntity =
    new InventoryOrganizationOfCountingSearchEntity();
  // employeeDetail:
  employeeDetailIds: EmployeeDetailOfCountingEntity[];
  employeeDetailExceptIds: EmployeeDetailOfCountingEntity[];
  employeeDetailSearchEntity: EmployeeDetailOfCountingSearchEntity = new EmployeeDetailOfCountingSearchEntity();
  employeeDetailTyping: Subject<EmployeeDetailOfCountingSearchEntity> = new Subject();
  // unitOfMeasure:
  unitOfMeasureSearchEntity: UnitOfMeasureOfCountingSearchEntity = new UnitOfMeasureOfCountingSearchEntity();
  // itemDetail:
  itemDetailSearchEntity: ItemDetailOfCountingSearchEntity = new ItemDetailOfCountingSearchEntity();
  // itemDetailCode:
  itemDetailCodeSearchEntity: ItemDetailOfCountingSearchEntity = new ItemDetailOfCountingSearchEntity();

  constructor(
    private router: Router,
    private inventoryCountingService: InventoryCountingDetailService,
    private inventoryCountingRepository: InventoryCountingDetailRepository,
    private generalService: GeneralService,
    private route: ActivatedRoute) {

    this.route.queryParams
      .subscribe(params => {
        if (params.id) {
          this.inventoryCountingId = params.id;
        }
        this.inventoryCountingService.getDetail(params.id).then(res => {
          if (res) {
            this.inventoryOrganizationId = res.inventoryOrganizationId;
            this.existedIds = res.inventoryCountingContents.map(item => item.itemDetailId);
            this.itemDetailSearchEntity.inventoryOrganizationId = this.inventoryOrganizationId;
          }
        });
      });
    const inventoryCountingFormSub = this.inventoryCountingService.inventoryCountingForm.subscribe(res => {
      if (res) {
        this.inventoryCountingForm = res;
        const inventoryCounters = this.inventoryCountingForm.get('inventoryCounters').value;
        const inventoryCountingContents = this.inventoryCountingForm.get('inventoryCountingContents').value;
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
    // binlocation:
    const binLocationListSub = this.inventoryCountingService.binLocationList.subscribe(res => {
      if (res) {
        this.binLocationList = res;
      }
    });
    this.inventoryCountingSubs.add(inventoryCountingFormSub)
      .add(employeeDetailListSub)
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
    this.router.navigate(['/inventory/counting/inventory-counting/inventory-counting-list']);
  }

  showBatches() {
    this.displayBatch = true;
  }

  showSerial() {
    this.displaySerial = true;
  }

  delete() {
    this.inventoryCountingService.delete(this.inventoryCountingId).then(res => {
      this.backToList();
    });
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

  send() {
    if (!this.inventoryCountingForm.valid) {
      this.generalService.validateAllFormFields(this.inventoryCountingForm);
    } else {
      this.inventoryCountingService.send(this.inventoryCountingForm.value).then(res => {
        this.backToList();
      });
    }
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

  // inventoryCoutingContents:
  clearUnitOfMeasure(tableInventoryCountingContents: any) {
    tableInventoryCountingContents.filter('', 'unitOfMeasureId', 'contains');
  }

  clearItemDetailId(table: any) {
    table.filter('', 'itemDetailId', 'contains');
  }
  cleartItemDetail(table: any) {
    table.filter('', 'id', 'contains');
  }
  addInventoryCountingContent() {
    this.inventoryCountingService.addInventoryCountingContent(this.inventoryCountingForm);
  }

  selectItemDetail(index: number, itemDetail: any) {
    this.existedIds.push(itemDetail.id);
    this.inventoryCountingService.selectItemDetail(this.inventoryCountingForm, index, itemDetail);
  }

  checkAllContents(target: any) {
    this.inventoryCountingService.checkAllContents(this.inventoryCountingForm, target.checked);
  }

  deleteMultiple() {
    this.inventoryCountingService.deleteMultiple(this.inventoryCountingForm);
  }

  openBinLocation(itemDetailId: string) {
    this.displayBinLocation = true;
    this.inventoryCountingService.getListBinLocation(this.inventoryOrganizationId, itemDetailId);
  }

  openItemDetail() {
    this.displayItemDetail = true;
    this.checkAllItem = false;
    const data = this.inventoryCountingForm.get('inventoryCountingContents').value;
    this.inventoryCountingService.getItemDetailList(data);
  }

  checkAllItemDetail(target: any) {
    this.inventoryCountingService.checkAllItemDetail(target.checked, this.itemDetailList);
  }

  saveItemDetail() {
    this.inventoryCountingService.saveItemDetail(this.inventoryCountingForm, this.itemDetailList);
    this.displayItemDetail = false;
  }

  // inventoryOrganization:
  selectInventoryOrganization(node: any) {
    this.inventoryCountingForm.get('inventoryOrganizationId').setValue(node.id);
    this.inventoryCountingForm.get('enableBinLocation').setValue(node.enableBinLocation);
    this.inventoryOrganizationId = node.id;
    this.itemDetailSearchEntity = new ItemDetailOfCountingSearchEntity({ inventoryOrganizationId: this.inventoryOrganizationId });
  }

  // employeeDetail
  dropListEmployeeDetail() {
    this.employeeDetailSearchEntity = new EmployeeDetailOfCountingSearchEntity();
    if (this.employeeList !== null && this.employeeList.length > 0) {
      this.employeeDetailSearchEntity.ids = [...this.employeeList];
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
    this.employeeList = [...event];
    this.employeeListIds = this.employeeList.map(item => item.id);
    this.inventoryCountingService.selectEmployee(this.inventoryCountingForm, this.employeeList);
  }
}

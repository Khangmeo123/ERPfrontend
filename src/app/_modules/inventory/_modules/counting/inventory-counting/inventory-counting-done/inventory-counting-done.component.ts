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
import { environment } from 'src/environments/environment';
import { GeneralService } from 'src/app/_services/general-service.service';
import { ToastrService } from 'ngx-toastr';
import { InventoryCountingDoneService } from './inventory-counting-done.service';
import { InventoryCountingDoneRepository } from './inventory-counting-done.repository';

@Component({
  selector: 'app-inventory-counting-done',
  templateUrl: './inventory-counting-done.component.html',
  styleUrls: ['./inventory-counting-done.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [InventoryCountingDoneService],
})
export class InventoryCountingDoneComponent implements OnInit, OnDestroy {
  pageTitle = translate('goodsReceiptDetail.header.title');
  fileNameList: Array<any> = [];
  inventoryCountingSubs: Subscription = new Subscription();
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
  inventoryCounters: any[] = [];
  inventoryCounterList: any[];
  // serialNumber:
  serialNumber: string;
  serialNumberSearchEntity: SerialNumberSearchEntity = new SerialNumberSearchEntity();
  serialNumberList: CounterContentByItemDetailEntity[];
  linkSerialNumberTemplate: string = environment.apiUrlInv +
    'inventory/counting/inventory-counting/inventory-counting-pending/serial-number/download-template';
  linkSerialNumberExport: string = environment.apiUrlInv +
    'inventory/counting/inventory-counting/inventory-counting-pending/serial-number/export';

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
    private inventoryCountingService: InventoryCountingDoneService,
    private generalService: GeneralService,
    private toastrService: ToastrService,
    private inventoryCountingRepository: InventoryCountingDoneRepository,
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
    // binlocation:
    const binLocationListSub = this.inventoryCountingService.binLocationList.subscribe(res => {
      if (res) {
        this.binLocationList = res;
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

  // invetoryCounterDetail:
  showInventoryCounterDetail(item: any) {
    this.displayInventoryCounter = true;
    this.inventoryCountingService.getListInventoryCounter(this.inventoryCountingId, item.id);
  }
}

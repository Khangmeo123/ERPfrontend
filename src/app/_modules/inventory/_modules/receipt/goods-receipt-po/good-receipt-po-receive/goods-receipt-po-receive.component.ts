import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GeneralService} from 'src/app/_services/general-service.service';
import {GoodsReceiptPOReceiveService} from './goods-receipt-po-receive.service';
import {GoodsReceiptPOContent} from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.entity';
import {Subscription} from 'rxjs';
import {
  GoodsReceiptPOContentSearchEntity,
  ItemDetailSearchEntity,
  UnitOfMeasureSearchEntity,
} from '../../../../_backend/goods-receipt-po/goods-receipt-po.searchentity';
import {translate} from '../../../../../../_helpers/string';
import {Table} from 'primeng/table';

@Component({
  selector: 'app-goods-receipt-po-receive',
  templateUrl: './goods-receipt-po-receive.component.html',
  styleUrls: ['./goods-receipt-po-receive.component.scss'],
  providers: [GoodsReceiptPOReceiveService],
  encapsulation: ViewEncapsulation.None,
})
export class GoodsReceiptPOReceiveComponent implements OnInit, OnDestroy {

  public pageTitle: string = translate('goodsReceiptPOContent.title');

  public subscription: Subscription = new Subscription();

  public goodsReceiptPOId: string = null;

  public goodsReceiptPOForm: FormGroup;

  public quantity: GoodsReceiptPOContent;

  public serialNumber: GoodsReceiptPOContent;

  public batch: GoodsReceiptPOContent;

  public displayQuantity: boolean = false;

  public displaySerialNumber: boolean = false;

  public displayBatch: boolean = false;

  public displayAttachments: boolean = false;

  public itemDetailSearchEntity: ItemDetailSearchEntity = new ItemDetailSearchEntity();

  public unitOfMeasureSearchEntity: UnitOfMeasureSearchEntity = new UnitOfMeasureSearchEntity();

  public goodsReceiptPOContentId: string;

  public goodsReceiptPOContentSearchEntity: GoodsReceiptPOContentSearchEntity = new GoodsReceiptPOContentSearchEntity();

  constructor(
    private goodsReceiptPOService: GoodsReceiptPOReceiveService,
    private generalService: GeneralService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    const routeSubscription: Subscription = this.route.queryParams.subscribe((params: Params) => {
      if (params.id) {
        this.goodsReceiptPOId = params.id;
      }
      this.goodsReceiptPOService.getDetail(params.id)
        .then(() => {
        });
    });

    const goodsReceiptFormSubscription = this.goodsReceiptPOService.goodsReceiptPOForm.subscribe((form: FormGroup) => {
      if (form) {
        this.goodsReceiptPOForm = form;
      }
    });

    const quantityDetailSubscription = this.goodsReceiptPOService.quantity.subscribe((content: GoodsReceiptPOContent) => {
      if (content) {
        this.quantity = content;
      }
    });

    const serialNumberDetailSubscription = this.goodsReceiptPOService.serialNumber.subscribe((content: GoodsReceiptPOContent) => {
      if (content) {
        this.serialNumber = content;
      }
    });

    const batchSubscription = this.goodsReceiptPOService.batch.subscribe((content: GoodsReceiptPOContent) => {
      if (content) {
        this.batch = content;
      }
    });

    this.subscription
      .add(goodsReceiptFormSubscription)
      .add(quantityDetailSubscription)
      .add(serialNumberDetailSubscription)
      .add(batchSubscription)
      .add(routeSubscription);
  }

  get fileAttachments() {
    return this.goodsReceiptPOForm.get('fileAttachments') as FormArray;
  }


  get enableBinLocation() {
    return this.goodsReceiptPOForm.get('enableBinLocation') as FormControl;
  }

  get supplierDetailId() {
    return this.goodsReceiptPOForm.get('supplierDetailId') as FormControl;
  }

  get dueDate() {
    return this.goodsReceiptPOForm.get('dueDate') as FormControl;
  }

  get documentDate() {
    return this.goodsReceiptPOForm.get('documentDate') as FormControl;
  }

  ngOnInit = () => {
  };

  ngOnDestroy = () => {
    this.subscription.unsubscribe();
  };

  // general:
  trackByFn = (index: number) => index;

  backToList = () => this.router.navigate(['/inventory/receipt/goods-receipt-po/goods-receipt-po-list']);

  reject = () => {
    this.goodsReceiptPOService.rejectReceive(this.goodsReceiptPOId)
      .then(() => {
        return this.backToList();
      });
  };

  receive = () => {
    this.goodsReceiptPOService.receive(this.goodsReceiptPOId)
      .then(() => {
        return this.backToList();
      });
  };

  showBatch = (goodsReceiptPOContent: GoodsReceiptPOContent) => {
    this.goodsReceiptPOContentId = goodsReceiptPOContent.id;
    this.displayBatch = true;
  };

  showQuantity = (goodsReceiptPOContent: GoodsReceiptPOContent) => {
    this.goodsReceiptPOContentId = goodsReceiptPOContent.id;
    this.displayQuantity = true;
  };

  showSerialNumber = (goodsReceiptPOContent: GoodsReceiptPOContent) => {
    this.goodsReceiptPOContentId = goodsReceiptPOContent.id;
    this.displaySerialNumber = true;
  };

  showAttachments = () => {
    this.displayAttachments = true;
  };

  onFilterPurchaseOrder = (table: Table) => {
    table.filter(
      this.goodsReceiptPOContentSearchEntity.purchaseOrderNumber.startsWith,
      'purchaseOrderNumber',
      'startsWith',
    );
  };

  onFilterItemCode = (table: Table) => {
    table.filter(
      this.goodsReceiptPOContentSearchEntity.itemCode.startsWith,
      'itemCode',
      'startsWith',
    );
  };

  onFilterItemName = (table: Table) => {
    table.filter(
      this.goodsReceiptPOContentSearchEntity.itemName.contains,
      'itemName',
      'contains',
    );
  };

  onFilterUnitOfMeasureCode = (table: Table) => {
    table.filter(
      this.goodsReceiptPOContentSearchEntity.unitOfMeasureCode.equal,
      'unitOfMeasureCode',
      'equal',
    );
  };

  updateBatch = () => {

  };

  clearTable = (table: Table) => {
    this.goodsReceiptPOContentSearchEntity = new GoodsReceiptPOContentSearchEntity();
    table.reset();
  };
}

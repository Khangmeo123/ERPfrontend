import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BinLocationSearchEntity, ItemDetailSearchEntity} from '../../../../../_backend/goods-receipt-po/goods-receipt-po.searchentity';
import {QuantityDialogRepository} from './quantity-dialog.repository';
import {GeneralService} from '../../../../../../../_services/general-service.service';
import {GoodsReceiptPOContent} from '../../../../../_backend/goods-receipt-po/goods-receipt-po.entity';
import {FormGroup} from '@angular/forms';
import {Table} from 'primeng/table';
import {TextFilter} from '../../../../../../../_shared/models/filters/TextFilter';
import {DateFilter} from '../../../../../../../_shared/models/filters/DateFilter';
import {QuantityDialogService} from './quantity-dialog.service';
import {ToastrService} from 'ngx-toastr';
import {translate} from '../../../../../../../_helpers/string';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-quantity-dialog',
  templateUrl: './quantity-dialog.component.html',
  styleUrls: ['./quantity-dialog.component.scss'],
  providers: [
    GeneralService,
  ],
})
export class QuantityDialogComponent implements OnInit {

  visible: boolean = false;

  @Output() displayChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() quantity: GoodsReceiptPOContent = new GoodsReceiptPOContent();

  @Input() goodsReceiptPOContentId: string;

  @Input() goodsReceiptPOContent: GoodsReceiptPOContent;

  @Input() goodsReceiptPOForm: FormGroup;

  @Input() itemDetailId: string;

  @Input() inputQuantity: (id: string, event) => void;

  @Input() updateQuantity: () => void;

  @Input() sortDate: (event, table: Table, field: string) => void;

  @Input() enableBinLocation: boolean;

  binLocationSearchEntity: BinLocationSearchEntity = new BinLocationSearchEntity();

  itemDetailSearchEntity: ItemDetailSearchEntity = new ItemDetailSearchEntity();

  quantityCode: TextFilter = new TextFilter();

  expirationDateFilter: DateFilter = new DateFilter();

  mfrDateFilter: DateFilter = new DateFilter();

  activeScan: boolean = false;

  public subscription: Subscription = new Subscription();

  constructor(
    private quantityDialogRepository: QuantityDialogRepository,
    private quantityDialogService: QuantityDialogService,
    private toastrService: ToastrService,
  ) {
    const quantitySubscription: Subscription = this.quantityDialogService.quantity.subscribe((quantity: GoodsReceiptPOContent) => {
      this.quantity = quantity;
    });

    this.subscription.add(quantitySubscription);
  }

  get display() {
    return this.visible;
  }

  @Input()
  set display(value) {
    this.visible = value;
    this.displayChange.emit(value);
    if (value) {
      if (this.goodsReceiptPOContentId) {
        this.quantityDialogService.getQuantity(this.goodsReceiptPOContentId);
      }
    }
  }

  ngOnInit(): void {
  }

  clearTable = (table: Table) => {

  };

  deleteSelected = () => {

  };

  onFilterItemDetail = (table: Table) => {
  };

  selectAll = (event) => {
    // const {goodsReceiptPOQuantities: quantities} = this.quantity;
    // quantities.forEach((quantity) => {
    //   quantity.isSelected = !event.checked;
    // });
  };

  addBinLocation = () => {
    // const {goodsReceiptPOQuantityBinLocations: binLocations} = this.quantity.goodsReceiptPOQuantities[quantityIndex];
    // const newBinLocation: QuantityBinLocationEntity = new QuantityBinLocationEntity();
    // newBinLocation.quantity = 0;
    // if (binLocations) {
    //   this.quantity.goodsReceiptPOQuantities[quantityIndex].goodsReceiptPOQuantityBinLocations = [
    //     ...binLocations,
    //     newBinLocation,
    //   ];
    // } else {
    //   this.quantity.goodsReceiptPOQuantities[quantityIndex].goodsReceiptPOQuantityBinLocations = [
    //     newBinLocation,
    //   ];
    // }
  };

  deleteBinLocation = (binLocationIndex: number) => {
    // const {goodsReceiptPOQuantityBinLocations: binLocations} = this.quantity.goodsReceiptPOQuantities[quantityIndex];
    // this.quantity.goodsReceiptPOQuantities[quantityIndex].goodsReceiptPOQuantityBinLocations = [
    //   ...binLocations.slice(0, binLocationIndex),
    //   ...binLocations.slice(binLocationIndex + 1),
    // ];
  };
}

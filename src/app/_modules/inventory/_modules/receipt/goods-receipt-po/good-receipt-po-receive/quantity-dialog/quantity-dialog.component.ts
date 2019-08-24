import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BinLocationSearchEntity, ItemDetailSearchEntity } from '../../../../../_backend/goods-receipt-po/goods-receipt-po.searchentity';
import { QuantityDialogRepository } from './quantity-dialog.repository';
import { GeneralService } from '../../../../../../../_services/general-service.service';

@Component({
  selector: 'app-quantity-dialog',
  templateUrl: './quantity-dialog.component.html',
  styleUrls: ['./quantity-dialog.component.scss'],
  providers: [
    GeneralService,
  ],
})
export class QuantityDialogComponent implements OnInit {

  itemDetailSearchEntity: ItemDetailSearchEntity = new ItemDetailSearchEntity();

  binLocationSearchEntity: BinLocationSearchEntity = new BinLocationSearchEntity();

  enableBinLocation: boolean = false;

  placeholder: string = '';

  activeScan: boolean = false;

  @Input() tableGoodsReceiptPOContents;

  @Input() display: boolean = false;

  @Input() quantity: any;

  @Input() addBinLocationQuantity;

  @Input() checkAllQuantity;

  @Input() updateQuantityDetail;

  @Input() deleteBinLocationQuantity;

  @Input() changeLocationInQuantity;

  @Input() recalculateQuantityDetail;

  @Input() sortDate;

  @Input() clearQuantityTable;

  @Input() quantityDetailList: any[] = [];

  @Input() quantityDetail;

  @Input() quantityItems;

  @ViewChild('tableQuantity', {static: false}) tableQuantity: ElementRef;

  constructor(private quantityDialogRepository: QuantityDialogRepository, private generalService: GeneralService) {
  }

  ngOnInit(): void {
  }
}

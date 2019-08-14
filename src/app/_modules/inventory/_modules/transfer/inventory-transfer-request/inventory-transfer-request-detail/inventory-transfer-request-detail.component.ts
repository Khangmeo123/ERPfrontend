import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { translate } from 'src/app/_helpers/string';
import { Router } from '@angular/router';

@Component({
  selector: 'app-goods-receipt-po-detail',
  templateUrl: './inventory-transfer-request-detail.component.html',
  styleUrls: ['./inventory-transfer-request-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InventoryTransferRequestDetailComponent implements OnInit {
  pageTitle = translate('inventoryTransfer.header.title');
  fileNameList: Array<any> = []
  tableTemp = [
    {
      total: 100000,
      type: 1,
    },
    {
      total: 2000000,
      type: 2, 
    },
    {
      total: 2000000,
      type: 3,
    }
  ]

  displayBatches: boolean = false;
  displaySerial: boolean = false;
  displayAmount: boolean = false;
  displayInventoryTransfer: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }


  readURL(event: any) {
    for(const item of event.srcElement.files) {
      this.fileNameList.push(item.name);
    }
  }

  showBatches() {
    this.displayBatches = true;
  }

  showSerial() {
    this.displaySerial = true;
  }

  showAmount() {
    this.displayAmount = true;
  }

  showInventoryTransfer() {
    this.displayInventoryTransfer = true;
  }

  backToList() {
    this.router.navigate(['/inventory/receipt/goods-receipt/goods-receipt-list']);
  }
}

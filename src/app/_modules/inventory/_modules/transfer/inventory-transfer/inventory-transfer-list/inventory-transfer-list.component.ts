import { Component, OnInit } from '@angular/core';
import {translate} from '../../../../../../_helpers/string';
import { Router } from '@angular/router';

@Component({
  selector: 'app-goods-receipt-po-list',
  templateUrl: './inventory-transfer-list.component.html',
  styleUrls: ['./inventory-transfer-list.component.scss']
})
export class InventoryTransferListComponent implements OnInit {
  pageTitle = translate('inventoryTransfer.header.title');
  tmp = [
    {
      name: 'Nguyen Van A',
      createDate: '20/11/2019',
      status: 1
    },
    {
      name: 'Nguyen Van A',
      createDate: '20/11/2019',
      status: 1
    },
    {
      name: 'Nguyen Van A',
      createDate: '20/11/2019',
      status: 1
    }
  ]
  constructor(private router: Router) { }

  ngOnInit() {
  }

  openDatePicker(matDatePicker) {
    matDatePicker.open();
  }

  openToDatePicker(matDatePicker) {
    matDatePicker.open();
  }

  sort() {

  }

  editInventoryTransfer() {
    this.router.navigate(['inventory/transfer/inventory-transfer/inventory-transfer-detail'])
  }

  addInventoryTransfer() {
    this.router.navigate(['inventory/transfer/inventory-transfer/inventory-transfer-detail'])
  }

}

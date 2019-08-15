import { Component, OnInit } from '@angular/core';
import {translate} from '../../../../../../_helpers/string';
import { Router } from '@angular/router';

@Component({
  selector: 'app-goods-receipt-po-list',
  templateUrl: './inventory-transfer-request-list.component.html',
  styleUrls: ['./inventory-transfer-request-list.component.scss']
})
export class InventoryTransferRequestListComponent implements OnInit {
  pageTitle = translate('inventoryTransferRequest.header.title');
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

  sort(event) {

  }

  editInventoryTransferRequest() {
    this.router.navigate(['inventory/transfer/inventory-transfer-request/inventory-transfer-request-detail'])
  }

  addInventoryTransferRequest() {
    this.router.navigate(['inventory/transfer/inventory-transfer-request/inventory-transfer-request-detail'])
  }

}

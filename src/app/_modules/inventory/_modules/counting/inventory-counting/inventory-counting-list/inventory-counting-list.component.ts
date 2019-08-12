import { Component, OnInit } from '@angular/core';
import {translate} from '../../../../../../_helpers/string';
import { Router } from '@angular/router';

@Component({
  selector: 'app-goods-receipt-po-list',
  templateUrl: './inventory-counting-list.component.html',
  styleUrls: ['./inventory-counting-list.component.scss']
})
export class InventoryCountingListComponent implements OnInit {
  pageTitle = translate('inventoryCounting.list.header.title')
  inventoryCountingList = [
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

  editInventoryCounting() {
    this.router.navigate(['inventory/counting/inventory-counting/inventory-counting-detail']);
  }

  addInventoryCounting() {
    this.router.navigate(['inventory/counting/inventory-counting/inventory-counting-detail']);
  }

}

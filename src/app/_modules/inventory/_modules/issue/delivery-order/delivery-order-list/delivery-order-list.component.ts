import { Component, OnInit } from '@angular/core';
import {translate} from '../../../../../../_helpers/string';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-order-list',
  templateUrl: './delivery-order-list.component.html',
  styleUrls: ['./delivery-order-list.component.scss']
})
export class DeliveryOrderListComponent implements OnInit {
  pageTitle = translate('deliveryOrder.list.header.title')
  deliveryOrderList = [
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

  editdeliveryOrder() {
    this.router.navigate(['inventory/issue/delivery-order/delivery-order-detail']);
  }

  adddeliveryOrder() {
    this.router.navigate(['inventory/issue/deliveryOrder/delivery-order-detail']);
  }

}

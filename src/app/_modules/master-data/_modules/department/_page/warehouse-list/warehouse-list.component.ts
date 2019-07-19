import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-warehouse-list',
  templateUrl: './warehouse-list.component.html',
  styleUrls: ['./warehouse-list.component.scss']
})
export class WarehouseListComponent implements OnInit {
  modal = false;

  constructor() {
  }

  ngOnInit() {
  }

  toggleModal() {
    this.modal = !this.modal;
  }
}

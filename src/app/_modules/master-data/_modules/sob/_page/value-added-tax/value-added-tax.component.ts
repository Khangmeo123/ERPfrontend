import { Component, OnInit } from '@angular/core';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';

@Component({
  selector: 'app-value-added-tax',
  templateUrl: './value-added-tax.component.html',
  styleUrls: ['./value-added-tax.component.scss']
})
export class ValueAddedTaxComponent implements OnInit {

  visible = false;
  constructor() { }
  pagination = new PaginationModel();
  ngOnInit() {
  }
  toggleModal() {
    this.visible = !this.visible;
  }
}

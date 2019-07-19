import { Component, OnInit } from '@angular/core';
import {PaginationModel} from '../../../../../../_shared/modules/pagination/pagination.model';

@Component({
  selector: 'app-special-consumption-tax',
  templateUrl: './special-consumption-tax.component.html',
  styleUrls: ['./special-consumption-tax.component.scss']
})
export class SpecialConsumptionTaxComponent implements OnInit {

  visible = false;
  constructor() { }
  pagination = new PaginationModel();
  ngOnInit() {
  }
  toggleModal() {
    this.visible = !this.visible;
  }

}

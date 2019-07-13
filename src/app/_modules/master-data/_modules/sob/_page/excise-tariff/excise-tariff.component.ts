import { Component, OnInit } from '@angular/core';

import { AdvancedFiltersComponent } from '../../../../../../_shared/modules/filters/advanced-filters/advanced-filters.component'
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';

@Component({
  selector: 'app-excise-tariff',
  templateUrl: './excise-tariff.component.html',
  styleUrls: ['./excise-tariff.component.scss']
})
export class ExciseTariffComponent implements OnInit {
  visible = false;
  constructor() { }
  pagination = new PaginationModel();
  ngOnInit() {
  }
  toggleModal() {
    this.visible = !this.visible;
  }
}

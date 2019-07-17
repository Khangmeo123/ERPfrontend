import { Component, OnInit } from '@angular/core';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';

@Component({
  selector: 'app-environment-tax',
  templateUrl: './environment-tax.component.html',
  styleUrls: ['./environment-tax.component.scss']
})
export class EnvironmentTaxComponent implements OnInit {

  visible = false;
  constructor() { }
  pagination = new PaginationModel();
  ngOnInit() {
  }
  toggleModal() {
    this.visible = !this.visible;
  }

}

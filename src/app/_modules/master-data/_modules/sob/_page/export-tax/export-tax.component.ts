import { Component, OnInit } from '@angular/core';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';

@Component({
  selector: 'app-export-tax',
  templateUrl: './export-tax.component.html',
  styleUrls: ['./export-tax.component.scss']
})
export class ExportTaxComponent implements OnInit {

  visible = false;
  pagination = new PaginationModel();

  constructor() {
  }

  ngOnInit() {
  }

  toggleModal() {
    this.visible = !this.visible;
  }

}

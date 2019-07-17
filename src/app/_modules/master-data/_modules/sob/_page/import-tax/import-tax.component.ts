import { Component, OnInit } from '@angular/core';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';

@Component({
  selector: 'app-import-tax',
  templateUrl: './import-tax.component.html',
  styleUrls: ['./import-tax.component.scss']
})
export class ImportTaxComponent implements OnInit {

  visible = false;
  constructor() { }
  pagination = new PaginationModel();
  ngOnInit() {
  }
  toggleModal() {
    this.visible = !this.visible;
  }

}
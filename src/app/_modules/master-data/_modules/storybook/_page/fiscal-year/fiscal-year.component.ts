import { Component, OnInit } from '@angular/core';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';

@Component({
  selector: 'app-fiscal-year',
  templateUrl: './fiscal-year.component.html',
  styleUrls: ['./fiscal-year.component.scss']
})
export class FiscalYearComponent implements OnInit {


  pagination = new PaginationModel();

  visible = false;
  constructor() { }

  ngOnInit() {
  }

  showDialog () {
    this.visible = !this.visible;
  }

}

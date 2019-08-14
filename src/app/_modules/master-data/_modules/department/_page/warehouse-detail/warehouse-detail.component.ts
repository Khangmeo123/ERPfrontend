import { Component, OnInit } from '@angular/core';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-warehouse-detail',
  templateUrl: './warehouse-detail.component.html',
  styleUrls: ['./warehouse-detail.component.scss'],
})
export class WarehouseDetailComponent implements OnInit {

  display: boolean = false;
  pagination = new PaginationModel();

  constructor(protected router: Router) {

  }

  ngOnInit() {
  }

}

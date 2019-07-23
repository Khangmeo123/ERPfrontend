import { Component, OnInit } from '@angular/core';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-supplier-group',
  templateUrl: './list-supplier-group.component.html',
  styleUrls: ['./list-supplier-group.component.scss']
})
export class ListSupplierGroupComponent implements OnInit {

  display : boolean = false;
  pagination = new PaginationModel();

  tmpSupplier = [
    {
      code: 1,
      name: 'Nguyễn Thị Hương',
    },
    {
      code: 1,
      name: 'Nguyễn Thị Hương',
    },
    {
      code: 1,
      name: 'Nguyễn Thị Hương',
    },
    {
      code: 1,
      name: 'Nguyễn Thị Hương',
    },
    {
      code: 1,
      name: 'Nguyễn Thị Hương',
    },
  ]

  constructor(protected router: Router) { }
  
  ngOnInit() {
  }
  onClickAddGroup () {
    this.display = !this.display;
  }
  onClickShowDetail() {
    this.router.navigate(['/master-data/legal-entity/supplier-group/detail-supplier-group']);
  }

  onClickAddSupplier() {
  }

  sortSupplierGroup(event) {

  }

  sortSupplier(event) {

  }
}

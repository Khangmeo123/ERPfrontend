import { Component, OnInit } from '@angular/core';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-warehouse-group',
  templateUrl: './warehouse-group.component.html',
  styleUrls: ['./warehouse-group.component.scss']
})
export class WarehouseGroupComponent implements OnInit {

  display: boolean = false;
  pagination = new PaginationModel();

  tmptable = [
    {
      code: '1',
      name: 'Nhóm kho 1'
    }
  ]
  constructor(protected router: Router) { }

  ngOnInit() {
  }

  onClickAdd () {
    this.display = true;
  }

  onClickViewDetail() {
    this.router.navigate(['/master-data/department/warehouse-group/warehouse'])
  }

}

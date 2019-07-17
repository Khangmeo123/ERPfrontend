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
  pagination = new PaginationModel()

  constructor(protected router: Router) { }
  
  
  ngOnInit() {
  }

  

  showAddSupplier() {
    this.display = !this.display;
  }
}

import { Component, OnInit } from '@angular/core';
import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-supplier',
  templateUrl: './list-supplier.component.html',
  styleUrls: ['./list-supplier.component.scss']
})
export class ListSupplierComponent implements OnInit {

  constructor(protected router: Router) { }
  filters = {
    id: new TextFilter(),
    name: new TextFilter(),
    address: new TextFilter(),
    tax_code: new TextFilter(),
    phone: new TextFilter(),
    status: new TextFilter()
  }

  ngOnInit() {
  }
  showdetail() {
    this.router.navigate(['/master-data/business-group/supplier/detail-supplier']);
  }
}

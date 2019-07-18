import { Component, OnInit } from '@angular/core';
import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';
import { Router } from '@angular/router';
@Component({
  selector: 'app-lisr-supplier-of-legal-entity',
  templateUrl: './list-supplier-of-legal-entity.component.html',
  styleUrls: ['./list-supplier-of-legal-entity.component.scss']
})
export class ListSupplierOfLegalEntityComponent implements OnInit {

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
    this.router.navigate(['/master-data/legal-entity/supplier-of-legal-entity/detail-supplier-legal-entity']);
  }
}

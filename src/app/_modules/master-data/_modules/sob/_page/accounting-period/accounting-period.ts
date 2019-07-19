import { Component, OnInit } from '@angular/core';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';

@Component({
  selector: 'app-accounting-period',
  templateUrl: './accounting-period.component.html',
  styleUrls: ['./accounting-period.component.scss']
})
export class AccountingPeriod implements OnInit {
  isChecked = false;

  visible = false;
  constructor() { }
  pagination = new PaginationModel();
  ngOnInit() {
  }
  toggleModal() {
    this.visible = !this.visible;
  }

  onClickChange() {
    this.isChecked = !this.isChecked;
  }

}

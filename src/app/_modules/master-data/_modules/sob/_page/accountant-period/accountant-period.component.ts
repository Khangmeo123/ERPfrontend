import { Component, OnInit } from '@angular/core';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';

@Component({
  selector: 'app-accountant-period',
  templateUrl: './accountant-period.component.html',
  styleUrls: ['./accountant-period.component.scss']
})
export class AccountantPeriodComponent implements OnInit {
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

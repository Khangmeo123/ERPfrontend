import { Component, OnInit } from '@angular/core';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-special-price-customer',
  templateUrl: './special-price-customer.component.html',
  styleUrls: ['./special-price-customer.component.scss']
})
export class SpecialPriceCustomerComponent implements OnInit {

  isSavedBookMark = false;

  isSaveBookMark: boolean = false;
  bookMarkId: string;

  display: boolean = false;
  pagination = new PaginationModel();
  public popoverTitle: string = 'Popover title';
  public popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  onClickSaveBookMark(event) {

  }

  showDialog() {
    this.display = true;
  }

  onClickCancel() {
    this.display = false;
  }

  onClickSave() {

  }

  onClickDelete() {
  }

}

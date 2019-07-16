import { Component, OnInit } from '@angular/core';
import { TextFilter } from '../../../../../../../_shared/models/filters/TextFilter';
import { PaginationModel } from '../../../../../../../_shared/modules/pagination/pagination.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-customer-group',
  templateUrl: './list-customer-group.component.html',
  styleUrls: ['./list-customer-group.component.scss']
})
export class ListCustomerGroupComponent implements OnInit {

  isSavedBookMark = false;

  isSaveBookMark: boolean = false;
  bookMarkId: string;
  title = 'bank.header.title';
  filters = {
    id: new TextFilter(),
    name: new TextFilter(),
    des: new TextFilter(),
  };

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

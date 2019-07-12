import { Component, OnInit } from '@angular/core';
import { TextFilter } from '../../../../../../_shared/models/filters/TextFilter';
import { PaginationModel } from '../../../../../../_shared/modules/pagination/pagination.model';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
})
export class CurrencyComponent implements OnInit {

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

  tmptable = [
    {
      id: 1,
      name: 'Thanh Tùng',
      des: 'tungpt@duyhung.vn',
    },
    {
      id: 1,
      name: 'Thanh Tùng',
      des: 'tungpt@duyhung.vn',
    },
    {
      id: 1,
      name: 'Thanh Tùng',
      des: 'tungpt@duyhung.vn',
    },
    {
      id: 1,
      name: 'Thanh Tùng',
      des: 'tungpt@duyhung.vn',
    },
    {
      id: 1,
      name: 'Thanh Tùng',
      des: 'tungpt@duyhung.vn',
    }, {
      id: 1,
      name: 'Thanh Tùng',
      des: 'tungpt@duyhung.vn',
    },
  ];

  constructor() {
  }

  ngOnInit() {
  }


  onClickSaveBookMark(event) {
    this.isSaveBookMark = !this.isSaveBookMark;
  }

  paginationOut(event) {

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

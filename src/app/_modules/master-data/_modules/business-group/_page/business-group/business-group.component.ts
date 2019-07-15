import { Component, OnInit } from '@angular/core';
import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';

@Component({
  selector: 'app-business-group',
  templateUrl: './business-group.component.html',
  styleUrls: ['./business-group.component.scss']
})
export class BusinessGroupComponent implements OnInit {
  isSaveBookMark: boolean = false;
  bookMarkId: string;
  filters = {
    id: new TextFilter(),
    name: new TextFilter(),
    des: new TextFilter(),
  }

  display: boolean = false;
  pagination = new PaginationModel();
  public popoverTitle: string = 'Popover title';
  public popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  showDialog() {
    this.display = true;
  }
  

}

import { Component, OnInit } from '@angular/core';
import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  isSaveBookMark: boolean = false;
  bookMarkId: string;
  filters = {
    id: new TextFilter(),
    name: new TextFilter(),
    des: new TextFilter(),
    unit: new TextFilter(),
    cost: new TextFilter(),
    status: new TextFilter()
  }

  display: boolean = false;
  pagination = new PaginationModel();
  public popoverTitle: string = 'Popover title';
  public popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;

  constructor(protected router: Router) { }

  ngOnInit() {
  }
  showdetail() {
    this.router.navigate(['/master-data/business-group/item/detail-item']);
  }
}

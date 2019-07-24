import { Component, OnInit } from '@angular/core';
import {PaginationModel} from '../../../../../../_shared/modules/pagination/pagination.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-item-group',
  templateUrl: './item-group.component.html',
  styleUrls: ['./item-group.component.scss']
})
export class ItemGroupComponent implements OnInit {

  isSavedBookMark = false;

  isSaveBookMark: boolean = false;
  bookMarkId: string;

  display: boolean = false;
  pagination = new PaginationModel();
  public popoverTitle: string = 'Popover title';
  public popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;

  tmpItem = [
    {
      code: 1,
      name: 'Nguyễn Thị Hương',
    },
    {
      code: 1,
      name: 'Nguyễn Thị Hương',
    },
    {
      code: 1,
      name: 'Nguyễn Thị Hương',
    },
    {
      code: 1,
      name: 'Nguyễn Thị Hương',
    },
    {
      code: 1,
      name: 'Nguyễn Thị Hương',
    },
  ]

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

  onClickShowDetail() {
    this.router.navigate(['/master-data/legal-entity/item-group/detail-item-group']);
  }
}

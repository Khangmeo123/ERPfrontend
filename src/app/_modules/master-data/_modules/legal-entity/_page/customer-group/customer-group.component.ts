import { Component, OnInit } from '@angular/core';
import {TextFilter} from '../../../../../../_shared/models/filters/TextFilter';
import {PaginationModel} from '../../../../../../_shared/modules/pagination/pagination.model';
import {Router} from '@angular/router';
import { BookmarkService } from 'src/app/_services';
import { translate } from 'src/app/_helpers/string';

@Component({
  selector: 'app-customer-group',
  templateUrl: './customer-group.component.html',
  styleUrls: ['./customer-group.component.scss']
})
export class CustomerGroupComponent implements OnInit {
  pageTitle: string = translate('customerGroup.header.title');
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
  isAddGroup: boolean = false

  constructor(
    private router: Router,
    private bookmarkService: BookmarkService,) {
  }

  ngOnInit() {
  }

  onClickSaveBookMark(event) {

  }

  onClickAddGroup () {
    this.isAddGroup = !this.isAddGroup;
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

  onClickShowDetail(){
    this.router.navigate(['/master-data/legal-entity/customer-group/customer-detail']);
  }

  onClickAddCustomer() {

  }


  bookMark() {
    this.isSaveBookMark = !this.isSaveBookMark;
    if (this.isSaveBookMark) {
      this.bookmarkService.addBookMarks({ name: this.pageTitle, route: this.router.url });
    } else {
      this.bookmarkService.deleteBookMarks({ name: this.pageTitle, route: this.router.url });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { DateFilter } from 'src/app/_shared/models/filters/DateFilter';
import { NumberFilter } from 'src/app/_shared/models/filters/NumberFilter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss']
})
export class ListEmployeeComponent implements OnInit {
  isSaveBookMark: boolean = false;
  bookMarkId: string;
  filters = {
    id: new TextFilter(),
    name: new TextFilter(),
    sex: new TextFilter(),
    birthday: new DateFilter(),
    id_emp: new NumberFilter(),
    account_number: new NumberFilter(),
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
    this.router.navigate(['/master-data/business-group/employee/detail-employee']);
  }
}

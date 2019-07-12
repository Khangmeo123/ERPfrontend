import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookmarkService } from 'src/app/_services';
import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { UserService } from 'src/app/_modules/admin/_pages/user/user.service';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss'],
  providers: [UserService],
})
export class BankComponent implements OnInit {

  isSaveBookMark: boolean = false;
  bookMarkId: string;
  title = 'bank.header.title';
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
    }
  ]
  userForm: FormGroup;
  userFormSub: Subscription;
  constructor(public userService: UserService) {
  }

  ngOnInit() {
    this.userFormSub = this.userService.userForm$.subscribe(user => {
      this.userForm = user;
    });
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

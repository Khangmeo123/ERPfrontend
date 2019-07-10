import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookmarkService } from 'src/app/_services';
import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
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

  pagination = new PaginationModel();


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

  constructor() {
  }

  ngOnInit() {
  }


  onClickSaveBookMark(event) {
    this.isSaveBookMark = !this.isSaveBookMark;
  }

  paginationOut(event) {

  }

}

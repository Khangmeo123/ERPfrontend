import { Component, OnInit } from '@angular/core';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-product-of-legal-entity',
  templateUrl: './list-product-of-legal-entity.component.html',
  styleUrls: ['./list-product-of-legal-entity.component.scss']
})
export class ListProductOfLegalEntityComponent implements OnInit {

  isSavedBookMark = false;

  isSaveBookMark: boolean = false;
  bookMarkId: string;
  display: boolean = false;

  pagination = new PaginationModel();

  tmptable = [
    {
      code: 1,
      name: 'Nguyễn Thị Hương',
      productGroup: 'huongnguyenhd96@gmail.com',
      des: 'hihi',
      unit: 1,
      primaryPrice: '1000000'
    },
    {
      code: 1,
      name: 'Nguyễn Thị Hương',
      productGroup: 'huongnguyenhd96@gmail.com',
      des: 'hihi',
      unit: 1,
      primaryPrice: '1000000'
    },
    {
      code: 1,
      name: 'Nguyễn Thị Hương',
      productGroup: 'huongnguyenhd96@gmail.com',
      des: 'hihi',
      unit: 1,
      primaryPrice: '1000000'
    },
    {
      code: 1,
      name: 'Nguyễn Thị Hương',
      productGroup: 'huongnguyenhd96@gmail.com',
      des: 'hihi',
      unit: 1,
      primaryPrice: '1000000'
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

  onClickSave() {

  }

  onClickDelete() {
  }

  onClickViewDetail() {
    this.router.navigate(['/master-data/legal-entity/product-of-legal-entity/detail-product-legal-entity']);
  }

}
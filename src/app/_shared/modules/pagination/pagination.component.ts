import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { PaginationModel } from './pagination.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() pagination: PaginationModel;
  @Output() paginationOut = new EventEmitter();
  public indexItem: number = 1;
  public totalPage: number = 0;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(change) {
    if (change.pagination && this.pagination && this.pagination.pageNumber) {
      this.indexItem = this.pagination.pageNumber;
      if (this.pagination.totalItems && this.pagination.take) {
        this.totalPage = Math.ceil(this.pagination.totalItems / this.pagination.take);
      }
      this.pagination.skip = (this.pagination.pageNumber - 1) * this.pagination.take;
    }
  }


  public onClickPrevious() {
    if (this.indexItem > 1) {
      this.indexItem--;
      this.pagination.pageNumber = this.indexItem;
      this.pagination.skip = (this.pagination.pageNumber - 1) * this.pagination.take;
      this.paginationOut.emit(this.pagination);
    }
  }


  public onClickNext() {
    if (this.indexItem < this.totalPage) {
      this.indexItem++;
      this.pagination.pageNumber = this.indexItem;
      this.pagination.skip = (this.pagination.pageNumber - 1) * this.pagination.take;
      this.paginationOut.emit(this.pagination);
    }
  }


  public onClickFirst() {
    if (this.indexItem !== 1) {
      this.indexItem = 1;
      this.pagination.pageNumber = this.indexItem;
      this.pagination.skip = (this.pagination.pageNumber - 1) * this.pagination.take;
      this.paginationOut.emit(this.pagination);
    }
  }


  public onClickLast() {
    if (this.indexItem !== this.totalPage) {
      this.indexItem = this.totalPage;
      this.pagination.pageNumber = this.indexItem;
      this.pagination.skip = (this.pagination.pageNumber - 1) * this.pagination.take;
      this.paginationOut.emit(this.pagination);
    }
  }


  public onSelectPageSize(value) {
    const pagesize = Number(value);
    if (pagesize !== this.pagination.take) {
      this.pagination.take = pagesize;
      this.totalPage = Math.ceil(this.pagination.totalItems / this.pagination.take);
      this.onClickFirst();
    }

  }

}

import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() pagination: any = {
    pageNumber: 4,
    pageSize: 50,
    totalItems: 400,
    skip: 0,
  };
  @Output() paginationOut = new EventEmitter();
  private indexItem: number = 1;
  private totalPage: number = 0;

  constructor() {
  }

  ngOnInit() {
    this.indexItem = this.pagination.pageNumber;
    if (this.pagination.totalItems && this.pagination.pageSize) {
      this.totalPage = Math.ceil(this.pagination.totalItems / this.pagination.pageSize);
    }
    this.pagination.skip = (this.pagination.pageNumber - 1) * this.pagination.pageSize;
  }

  ngOnChanges(change) {
    if (change.pagination && this.pagination && this.pagination.pageNumber) {
      this.indexItem = this.pagination.pageNumber;
      if (this.pagination.totalItems && this.pagination.pageSize) {
        this.totalPage = Math.ceil(this.pagination.totalItems / this.pagination.pageSize);
      }
      this.pagination.skip = (this.pagination.pageNumber - 1) * this.pagination.pageSize;
    }
  }


  public onClickPrevious() {
    if (this.indexItem > 1) {
      this.indexItem--;
      this.pagination.pageNumber = this.indexItem;
      this.pagination.skip = (this.pagination.pageNumber - 1) * this.pagination.pageSize;
      this.paginationOut.emit(this.pagination);
    }
  }


  public onClickNext() {
    if (this.indexItem < this.totalPage) {
      this.indexItem++;
      this.pagination.pageNumber = this.indexItem;
      this.pagination.skip = (this.pagination.pageNumber - 1) * this.pagination.pageSize;
      this.paginationOut.emit(this.pagination);
    }
  }


  public onClickFirst() {
    if (this.indexItem !== 1) {
      this.indexItem = 1;
      this.pagination.pageNumber = this.indexItem;
      this.pagination.skip = (this.pagination.pageNumber - 1) * this.pagination.pageSize;
      this.paginationOut.emit(this.pagination);
    }
  }


  public onClickLast() {
    if (this.indexItem !== this.totalPage) {
      this.indexItem = this.totalPage;
      this.pagination.pageNumber = this.indexItem;
      this.pagination.skip = (this.pagination.pageNumber - 1) * this.pagination.pageSize;
      this.paginationOut.emit(this.pagination);
    }
  }


  public onSelectPageSize(value) {
    const pagesize = Number(value);
    if (pagesize !== this.pagination.pageSize) {
      this.pagination.pageSize = pagesize;
      this.onClickFirst();
    }

  }

}

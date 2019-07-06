export class PaginationEntity {
  pageNumber: number = 1;
  pageSize: number = 50;
  totalItems: number = 0;
  skip: number =  0;


  constructor(Pagination: any = null) {
    if (Pagination !== undefined && Pagination !== null) {
      Object.assign(this, Pagination);
    }
  }
}

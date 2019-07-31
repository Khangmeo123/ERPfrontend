export class PaginationModel {
  pageNumber: number;
  totalItems: number;
  take: number;
  skip: number;

  constructor(event?) {
    if (event !== null && event !== undefined) {
      this.pageNumber = event.pageNumber !== null ? event.pageNumber : 1;
      this.skip = event.skip !== null ? event.skip : 0;
      this.take = event.take !== null ? event.take : 10;
      this.totalItems = event.totalItems !== null ? event.totalItems : 0;
    } else {
      this.pageNumber = 1;
      this.take = 10;
      this.totalItems = 0;
      this.skip = 0;
    }
  }
}

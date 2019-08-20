export interface ISearchEntity {
  id: string;

  ids: string[];

  skip: number;

  take: number;

  orderBy: string;

  orderType: string;

  // tslint:disable-next-line:ban-types
  constructor: Function;
}

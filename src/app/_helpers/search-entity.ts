import { ISearchEntity } from 'jaja-libraries/src/entities/ISearchEntity';

export class SearchEntity implements ISearchEntity {

  id: string = null;

  ids: string[] = [];

  existedIds: string[] = [];

  skip: number;

  take: number;

  orderBy: string;

  orderType: string;

  public constructor(searchEntity?: ISearchEntity) {
    if (searchEntity !== null && searchEntity !== undefined) {
      Object.keys(searchEntity).forEach((item) => {
        if (searchEntity.hasOwnProperty(item)) {
          this[item] = searchEntity[item];
        }
      });
    }
  }
}

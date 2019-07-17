import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

export interface BookMark {
  Id: string;
  Name: string;
  Route: string;
}

@Injectable({providedIn: 'root'})
export class BookmarkService {
  public listBookMarks: BookMark[] = [];
  private pushItem = new Subject<boolean>();
  public pushItemObs = this.pushItem.asObservable();

  constructor() {
  }

  addBookMarks(item: BookMark) {
    const indexOf = this.listBookMarks.indexOf(item);
    if (indexOf < 0) {
      this.listBookMarks.push(item);
    }
  }

  deleteBookMarks(item: BookMark) {
    const indexOf = this.listBookMarks.indexOf(item);
    this.listBookMarks.splice(indexOf, 1);
    this.pushItem.next(false);
  }

  checkBookMarks(item: BookMark) {
    const filter = this.listBookMarks.filter((result) => {
      return result.Id = item.Id;
    });
    if (filter.length > 0) {
      this.pushItem.next(true);
    }
  }
}

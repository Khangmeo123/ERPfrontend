import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
export class BookMark {
    id?: string;
    route: string;
    name: string;

    constructor(bookmark: any) {
        if (bookmark !== null && bookmark !== undefined) {
            this.name = bookmark.name;
            this.route = bookmark.route;
            this.id = bookmark.name + '-' + bookmark.route;
        }
    }
}

@Injectable({ providedIn: 'root' })
export class BookmarkService {
    public listBookMarks: BookMark[] = [];
    private pushItem = new Subject<boolean>();
    public pushItemObs = this.pushItem.asObservable();
    constructor() {
    }
    addBookMarks(bookMark: BookMark) {
        const item = new BookMark(bookMark);
        const filter = this.listBookMarks.filter((result) => {
            return result.id === item.id;
        });
        if (filter.length === 0) {
            this.listBookMarks.push(item);
        }
    }
    deleteBookMarks(bookMark: BookMark) {
        const item = new BookMark(bookMark);
        const index = this.listBookMarks.map(x => {
            return x.id;
        }).indexOf(item.id);
        this.listBookMarks.splice(index, 1);
        this.pushItem.next(false);
    }
    checkBookMarks(bookMark: BookMark) {
        const item = new BookMark(bookMark);
        const filterItem = this.listBookMarks.filter((result) => {
            return result.id === item.id;
        });
        if (filterItem.length > 0) {
            this.pushItem.next(true);
        }
    }
}

import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BookmarkService {

    listBookmark = new Subject<any>();

    constructor() { }

    addBookmark(item){
        this
    }

    removeBookmark(item){

    }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';

@Injectable({
    providedIn: 'root',
})
export class BankRepository extends Repository {
    constructor(public http: HttpClient) {
        super(http);
    }

    list() {

    }
    count() {

    }
    getId() {

    }
    add() {

    }
    edit() {

    }
    delete() {

    }
}
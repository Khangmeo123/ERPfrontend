import { Injectable } from '@angular/core';
import { UserEntity } from './user.entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRepository {
  observable: Observable<UserEntity>;
  constructor() { 

  }
  getUser(): Observable<UserEntity> {
    let User = new UserEntity({Display: 'TestUser1', Name: 'testuser1@gmail.com'});
    this.observable =  new Observable(subscriber => {
      subscriber.next(User);
      subscriber.complete();
    });
    return this.observable;
  }
}

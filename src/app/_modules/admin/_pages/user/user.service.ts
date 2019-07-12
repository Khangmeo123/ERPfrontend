import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {FormGroup, FormBuilder, FormArray} from '@angular/forms';
import {UserForm} from './model/user.model';
import {UserRepository} from '../../_backend/user/user.repository';

@Injectable()
export class UserService {
  private userForm: BehaviorSubject<FormGroup | undefined> = new BehaviorSubject(this.fb.group(
    new UserForm(),
  ));
  userForm$: Observable<FormGroup> = this.userForm.asObservable();

  constructor(private fb: FormBuilder, private userRepository: UserRepository) {
  }

  getUser() {
    this.userRepository.getUser().subscribe(res => {
      if (res) {
        this.userForm.next(this.fb.group(
          new UserForm(res),
        ));
      }
    });
  }
}

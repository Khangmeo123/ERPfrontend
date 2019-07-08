import { BookmarkService } from 'src/app/_services';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [UserService]
})
export class UserComponent implements OnInit {
  playerForm: FormGroup;
  userForm: FormGroup;
  userFormSub: Subscription;
  bookMarkId: string;
  public isSaveBookMark: boolean = false;
  public title = "Editable Table";
  constructor(
    private fb: FormBuilder,
    private UserService: UserService,
    private router: Router,
    private bookmarkService: BookmarkService) {
    this.playerForm = this.fb.group({
      firstName: this.fb.control('FirstName'),
      lastName: this.fb.control('LastName')
    });
    this.bookMarkId = 'user' + '-' + this.router.url;
  }

  ngOnInit() {

    this.userFormSub = this.UserService.userForm$.subscribe(user => {
      this.userForm = user;
    });
    const bookMarkNotify = this.bookmarkService.pushItemObs.subscribe(res => {
      this.isSaveBookMark = res;
    });
    this.bookmarkService.checkBookMarks({ Name: 'user', Route: this.router.url, Id: this.bookMarkId });
    this.userFormSub.add(bookMarkNotify);
    this.UserService.getUser();
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.userFormSub.unsubscribe();
  }


  onClickSaveBookMark(event) {
    this.isSaveBookMark = !this.isSaveBookMark;
    if (this.isSaveBookMark) {
      this.bookmarkService.addBookMarks({ Name: 'user', Route: this.router.url, Id: this.bookMarkId });
    } else {
      this.bookmarkService.deleteBookMarks({ Name: 'user', Route: this.router.url, Id: this.bookMarkId });
    }
  }
}

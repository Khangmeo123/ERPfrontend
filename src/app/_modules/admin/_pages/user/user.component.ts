import { Component, OnInit } from '@angular/core';
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

  public isSaveBookMark: boolean = false;
  public title = "Editable Table";

  public listBookMark: Array<any> = [];
  public listBookMarkObj: any;
  constructor(
    private fb: FormBuilder,
    private UserService: UserService,
    private router: Router) {
    this.playerForm = this.fb.group({
      firstName: this.fb.control('FirstName'),
      lastName: this.fb.control('LastName')
    });

    this.listBookMark = JSON.parse(localStorage.getItem('key_luu_book_mark'));
  }

  ngOnInit() {
    this.listBookMark.forEach(item => {
      if (item.route === this.router.url) {
        this.isSaveBookMark = true;
      } else {
        this.isSaveBookMark = false;
      }
    })
    this.userFormSub = this.UserService.userForm$.subscribe(user => {
      this.userForm = user;
    })
    this.UserService.getUser();
  }
  ngOnDestroy(): void {
    this.userFormSub.unsubscribe();
  }


  onClickSaveBookMark(event) {

    this.isSaveBookMark = !this.isSaveBookMark;
    const listRoute = []
    for (const item of this.listBookMark) {
      listRoute.push(item.route);
    }
    const index = listRoute.indexOf(this.router.url);
    if (this.isSaveBookMark) {
      if (index < 0) {
        this.listBookMark.push({ title: this.title, route: this.router.url });
      }
    } else {
      if (index > -1) {
        this.listBookMark.splice(index, 1);
      }
    }


    localStorage.setItem('key_luu_book_mark', JSON.stringify(this.listBookMark));

  }
}

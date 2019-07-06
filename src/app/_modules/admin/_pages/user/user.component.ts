import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers:[UserService]
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
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.userFormSub.unsubscribe();
  }


  onClickSaveBookMark(event) {
    this.isSaveBookMark = !this.isSaveBookMark;
  }
}

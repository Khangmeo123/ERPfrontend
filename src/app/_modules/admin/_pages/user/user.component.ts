import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';

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
  constructor(private fb: FormBuilder, private UserService: UserService) { 
    this.playerForm = this.fb.group({
      firstName: this.fb.control('FirstName'),
      lastName: this.fb.control('LastName')
    });
  }

  ngOnInit() {
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
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../_services';
import { GeneralService } from '../../_services/general-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.scss',
  ],
  providers: [
    GeneralService,
  ],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  loading = false;

  submitted = false;

  returnUrl: string;

  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private generalService: GeneralService,
  ) {
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  get username() {
    return this.loginForm.get('username') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  ngOnInit() {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      return this.router.navigate(['/']);
    }

    this.loginForm = this.formBuilder.group({
      username: ['thangld', Validators.required],
      password: ['abc', Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  async onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.generalService.validateAllFormFields(this.loginForm);
    }

    if (this.loginForm.valid) {
      this.loading = true;
      await this.authenticationService.login(this.username.value, this.password.value);
      await this.router.navigate(['/']);
      this.loading = false;
    }
  }
}

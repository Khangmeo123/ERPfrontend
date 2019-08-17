import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { PageComponent } from './_pages/page/page.component';
import { LoginComponent } from './_pages/login/login.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';

import { ErrorInterceptor, JwtInterceptor } from './_helpers';
import { SidebarComponent } from './_pages/page/sidebar/sidebar.component';
import { NavbarComponent } from './_pages/page/navbar/navbar.component';
import { FooterComponent } from './_pages/page/footer/footer.component';
import { SpinnerComponent } from './_shared/components/spinner/spinner.component';
import { MatIconModule } from '@angular/material';
import { DropdownModule } from 'primeng/dropdown';
import { PipeModule } from './_shared/pipe/pipe.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ClickOutsideModule } from 'ng-click-outside';
import { SidebarListComponent } from './_pages/page/sidebar/sidebar-list/sidebar-list.component';
import { CookieService } from 'ngx-cookie-service';

import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SignUpComponent } from './_pages/sign-up/sign-up.component';
import { ResetPasswordComponent } from './_pages/reset-password/reset-password.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SelectModule } from './_shared/modules/select/select.module';


@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    LoginComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    SpinnerComponent,
    SidebarListComponent,
    SignUpComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatIconModule,
    DropdownModule,
    FormsModule,
    PipeModule,
    CollapseModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 2500,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ClickOutsideModule,
    MatInputModule,
    MatCheckboxModule,
    SelectModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    CookieService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

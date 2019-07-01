import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {ToastrModule} from 'ngx-toastr';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {TreeModule} from 'primeng/tree';

import {AppComponent} from './app.component';
import {PageComponent} from './_pages/page/page.component';
import {LoginComponent} from './_pages/login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ErrorInterceptor, JwtInterceptor} from './_helpers';
import {SidebarComponent} from './_pages/page/sidebar/sidebar.component';
import {NavbarComponent} from './_pages/page/navbar/navbar.component';
import {FooterComponent} from './_pages/page/footer/footer.component';
import {SpinnerComponent} from './_shared/components/spinner/spinner.component';
import {TreeComponent} from './_shared/components/tree/tree.component';
import {ClickOutsideModule} from 'ng-click-outside';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    LoginComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    SpinnerComponent,
    TreeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    ToastrModule.forRoot(),
    HttpClientModule,
    MatProgressSpinnerModule,
    TreeModule,
    BrowserAnimationsModule,
    ClickOutsideModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

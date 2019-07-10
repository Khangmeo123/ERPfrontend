import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { PageComponent } from './_pages/page/page.component';
import { LoginComponent } from './_pages/login/login.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { SidebarComponent } from './_pages/page/sidebar/sidebar.component';
import { NavbarComponent } from './_pages/page/navbar/navbar.component';
import { FooterComponent } from './_pages/page/footer/footer.component';
import { SpinnerComponent } from './_shared/components/spinner/spinner.component';
import { ItemSidebarComponent } from './_pages/page/sidebar/itemsidebar/itemsidebar.component';
import { MatIconModule } from '@angular/material';
import {DropdownModule} from 'primeng/dropdown';
import {PipeModule} from './_shared/pipe/pipe.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    LoginComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    SpinnerComponent,
    ItemSidebarComponent,
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
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

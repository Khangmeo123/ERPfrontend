import { Component } from '@angular/core';
import { IdbService } from './_services/idb.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CookieService],
})
export class AppComponent {
  title = 'CodeBase';
  constructor(private idbService: IdbService, private cookieService: CookieService) {
    const tokenCookie = this.cookieService.get('token');
    if (tokenCookie.length === 0) {
      this.cookieService.set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI1N2JmMDE5OC1mMTA2LTQ1MGQtYmM1ZS1mMWY2NDUyZmRjNDciLCJ1bmlxdWVfbmFtZSI6Imh1eWJxIiwiQnVzaW5lc3NHcm91cElkIjoiMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwIiwiSXNTdXBlckFkbWluIjoiVHJ1ZSIsIm5iZiI6MTU2MzE1OTc0NiwiZXhwIjoxNTczMTU5NzQ1LCJpYXQiOjE1NjMxNTk3NDZ9.9ll68DtTqe0Rs43Pm7jHRJiYNuUCiEGnnC6trMAGt4Q");
    }
    // this.idbService.connectToIDB().then(res => {
    //   this.idbService.getAllKey('objectStoreValue').then(result => {
    //     if (typeof Worker !== 'undefined') {
    //       // Create a new
    //       const worker = new Worker('./app.worker', { type: 'module' });
    //       worker.onmessage = ({ data }) => {
    //         console.log(data);
    //       };
    //       worker.postMessage({ name: 'NewDb', keys: result});
    //     } else {
    //       console.log('Browser not support Webworker');
    //     }
    //   });
    // });
  }
}
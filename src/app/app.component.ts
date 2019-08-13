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

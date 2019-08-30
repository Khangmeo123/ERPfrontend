import {Component} from '@angular/core';
import {NzIconService} from 'ng-zorro-antd/icon';
import {NotificationOutline, LaptopOutline, UserOutline} from '@ant-design/icons-angular/icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    NzIconService,
  ],
})
export class AppComponent {
  title = 'JAJA Libraries';

  constructor(private iconService: NzIconService) {
    this.iconService.addIcon(NotificationOutline, LaptopOutline, UserOutline);
  }
}

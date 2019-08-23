import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IconService } from '@ant-design/icons-angular';
import { InboxOutline } from '@ant-design/icons-angular/icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    IconService,
  ],
})
export class AppComponent {
  title = 'JAJA';

  constructor(private translateService: TranslateService, private iconService: IconService) {
    this.translateService.setDefaultLang('vi');
    this.translateService.use('vi');
    this.iconService.addIcon(
      InboxOutline,
    );
    this.iconService.twoToneColor = {
      primaryColor: '#1890ff',
    };
  }
}

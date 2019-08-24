import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../_services';


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PageComponent implements OnInit {

  public isPinned = false;

  constructor(private appService: AppService) {
  }

  get class() {
    return {
      'pinned-sidebar': this.appService.getSidebarStat().isSidebarPinned,
      'toggled-sidebar': this.appService.getSidebarStat().isToggled,
    };
  }

  ngOnInit() {
  }

  onChangeToggle(event) {
    this.isPinned = event;
  }
}

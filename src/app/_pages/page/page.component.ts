import { Component, OnInit } from '@angular/core';
import { AppService } from '../../_services/app.service';


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {
  public isToggle = false;
  constructor(private appService: AppService) { }

  ngOnInit() {
  }

  getClasses() {
    const classes = {
      'pinned-sidebar': this.appService.getSidebarStat().isSidebarPinned,
      'toggeled-sidebar': this.appService.getSidebarStat().isSidebarToggeled
    }
    return classes;
  }
  toggleSidebar() {
    this.appService.toggleSidebar();
  }

  onChangeToggle(event) {
    console.log('onChangeToggle', event)
    this.isToggle = event;
  }
}

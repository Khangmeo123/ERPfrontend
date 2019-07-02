import { Component, OnInit } from '@angular/core';
import { AppService } from '../../_services/app.service';


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  private isShow: boolean = false;
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.isShow = this.appService.getSidebarStat().isSidebarPinned;
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
}

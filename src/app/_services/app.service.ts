import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  isSidebarPinned = false;
  isSidebarToggeled = false;

  constructor() { }

  toggleSidebar() {
    this.isSidebarToggeled = ! this.isSidebarToggeled;
    console.log('toggleSidebar', this.isSidebarToggeled);
  }

  toggleSidebarPin() {
    this.isSidebarPinned = ! this.isSidebarPinned;
    console.log('toggleSidebarPin', this.isSidebarPinned)
  }

  getSidebarStat() {
    return {
      isSidebarPinned: this.isSidebarPinned,
      isSidebarToggeled: this.isSidebarToggeled
    }
  }

}

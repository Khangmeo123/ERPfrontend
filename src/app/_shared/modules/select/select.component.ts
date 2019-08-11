import {ViewChild} from '@angular/core';

export abstract class SelectComponent {
  protected isOpened = false;

  protected listDirection = 'down';

  @ViewChild('head', {static: false}) head;

  beforeCloseList() {
  }

  beforeOpenList() {
    const {
      top,
      bottom,
    } = this.head.nativeElement.getBoundingClientRect();
    if (top + bottom <= window.innerHeight) {
      this.listDirection = 'down';
      return;
    }
    this.listDirection = 'up';
    return;
  }

  openList() {
    if (!this.isOpened) {
      this.beforeOpenList();
      this.isOpened = true;
    }
  }

  closeList() {
    if (this.isOpened) {
      this.beforeCloseList();
      this.isOpened = false;
    }
  }

  toggleList() {
    if (this.isOpened) {
      this.beforeCloseList();
    } else {
      this.beforeOpenList();
    }
    this.isOpened = !this.isOpened;
  }
}

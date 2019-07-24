import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-select-head',
  templateUrl: './select-head.component.html',
  styleUrls: ['./select-head.component.scss'],
})
export class SelectHeadComponent implements OnInit {
  @Input() caretDirection = 'down';

  @Input() label = '';

  @Output() headClick = new EventEmitter();

  @Output() openList = new EventEmitter();

  @Output() closeList = new EventEmitter();

  @Output() toggleList = new EventEmitter();

  @ViewChild('head', {static: false}) head;

  constructor() {
  }

  ngOnInit() {
  }

  onHeadClick(event) {
    this.headClick.emit(event);
  }

  onKeyDown(event) {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        this.openList.emit(event);
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        this.closeList.emit(event);
        break;
      case 'Enter':
        this.toggleList.emit(event);
        break;
      default:
        break;
    }
  }
}

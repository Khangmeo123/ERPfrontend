import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-select-head',
  templateUrl: './select-head.component.html',
  styleUrls: ['./select-head.component.scss'],
})
export class SelectHeadComponent implements OnInit {
  @Input() caretDirection = 'down';

  @Input() label = 'Select Label';

  @Output() headClick = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }
}

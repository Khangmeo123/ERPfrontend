import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-select-body',
  templateUrl: './select-body.component.html',
  styleUrls: ['./select-body.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SelectBodyComponent implements OnInit {

  @Input() scaleX = '';

  constructor() {
  }

  ngOnInit() {
  }
}

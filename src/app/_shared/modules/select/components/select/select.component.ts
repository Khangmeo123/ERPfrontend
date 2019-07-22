import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SelectComponent implements OnInit {

  @Input() disabled = true;

  @Input() listDirection = 'down';

  constructor() {
  }

  get disabledClass() {
    return this.disabled ? 'disabled' : '';
  }

  ngOnInit() {
  }
}

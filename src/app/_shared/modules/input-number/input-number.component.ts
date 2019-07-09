import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: [
    './input-number.component.scss',
  ],
})
export class InputNumberComponent implements OnInit {
  @Input() control: FormControl = new FormControl();

  @Input() thousandSeparator = '.';

  @Input() decimalSeparator = ',';

  @Input() precision = 4;

  @Input() onlyInteger = false;

  @Input() allowNegative = true;

  @Output() numberChange = new EventEmitter();

  checkControl = false;

  get value() {
    console.log(this.control.value);
    return this.control.value;
  }

  set value(value) {
    this.control.setValue(value);
  }

  ngOnInit(): void {
  }

  onKeyUp(event) {
    if (event.key === 'Control') {
      this.checkControl = false;
    }
  }

  onKeyDown(event) {
    if (event.key === 'Control') {
      this.checkControl = true;
    }
    if (!this.checkControl) {

    }
  }

  onChange(event) {
    console.log('change');
    console.log(event);
  }

  onInput(event) {

  }
}

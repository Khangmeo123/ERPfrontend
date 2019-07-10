import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {generateRandomString} from '../../../_helpers/string';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: [
    './input-number.component.scss',
  ],
})
export class InputNumberComponent implements OnInit {
  @Input() control: FormControl = new FormControl();

  @Input() thousandSeparator = ',';

  @Input() decimalSeparator = '.';

  @Input() precision = 4;

  @Input() onlyInteger = false;

  @Input() allowNegative = true;

  @Input() inputId = generateRandomString(10);

  @Output() numberChange = new EventEmitter();

  checkControl = false;

  get value() {
    const value: number = this.control.value;
    if (typeof value === 'number') {
      const [integerPart, decimalPart = null] = value.toString().split('.');
      let result = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandSeparator);
      if (decimalPart) {
        result += `${this.decimalSeparator}${decimalPart}`;
      }
      return result;
    }
    return null;
  }

  set value(value) {
    if (value === '' || value === null) {
      this.control.setValue(null);
      return;
    }
    let str = value.split(this.thousandSeparator).join('');
    str = str.split(this.decimalSeparator).join('.');
    const isNegative = str[0] === '-';
    if (str === '-') {
      this.control.setValue('-');
      return;
    }
    if (isNegative) {
      str = str.substr(1);
    }
    const result = this.allowNegative ? parseFloat(str) : parseInt(str, 10);
    this.control.setValue(isNegative ? -result : result);
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
    if (this.checkControl) {
      return;
    }
    if (event.key.length === 1) {
      if (event.key === this.decimalSeparator) {
        if (this.onlyInteger || event.target.value.indexOf(this.decimalSeparator) >= 0) {
          // Not allow enter decimal separator twice or in integer mode
          return event.preventDefault();
        }
        return;
      }
      if (!event.key.match(/[0-9]/)) {
        if (event.key === '-') {
          if (!this.allowNegative || event.target.value.indexOf('-') >= 0) {
            // Not allow negative number
            return event.preventDefault();
          }
          return;
        }
        return event.preventDefault();
      }
      if (event.target.value.lastIndexOf(this.decimalSeparator) + 1 + this.precision === event.target.value.length) {
        return event.preventDefault();
      }
    }
    if (event.key === 'ArrowUp') {
      this.control.setValue(this.control.value + 1);
    } else if (event.key === 'ArrowDown') {
      this.control.setValue(this.control.value - 1);
    }
  }

  onChange() {
    this.numberChange.emit(this.control.value);
  }

  onInput(event) {
    this.value = event.target.value;
  }
}

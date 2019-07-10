import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DEFAULT_DATE_FORMAT} from './date-picker.formats';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: [
    './date-picker.component.scss',
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [
        MAT_DATE_LOCALE,
      ],
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: DEFAULT_DATE_FORMAT,
    },
  ],
})
export class DatePickerComponent implements OnInit {
  checkCtrl = false;

  @Input() control = new FormControl();

  @Input() inputReadOnly = false;

  @Output() valueChange = new EventEmitter();

  @ViewChild('matDatepickerToggle', {static: false}) matDatepickerToggle;

  constructor() {
  }

  get value() {
    return this.control.value;
  }

  set value(value) {
    this.control.setValue(value);
  }

  @Input() validator = () => null;

  ngOnInit() {
  }

  onFocus() {
  }

  onDateChange(event) {
    this.value = event.targetElement.value;
    this.valueChange.emit(this.value);
  }

  onKeyUp(event) {
    if (event.key === 'Control') {
      this.checkCtrl = false;
    }
  }

  onKeyDown(event) {
    const {target} = event;
    if (event.key === 'Control') {
      this.checkCtrl = true;
    }
    if (!this.checkCtrl) {
      if (event.key.length === 1) {
        if (target.value.length > 10 || !event.key.match(/[0-9\-\/]/)) {
          event.preventDefault();
          return;
        }
        if (target.value.length === 2 || target.value.length === 5) {
          event.preventDefault();
          target.value += '/';
          return;
        }
        if (event.key < '0' || event.key > '9') {
          event.preventDefault();
          return;
        }
        return;
      }
    }
  }
}

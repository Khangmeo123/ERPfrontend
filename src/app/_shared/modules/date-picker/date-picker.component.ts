import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DEFAULT_DATE_FORMAT } from './date-picker.formats';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: [
    './date-picker.component.scss',
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [
    TranslateService,
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
export class DatePickerComponent implements OnInit, OnChanges {
  checkCtrl = false;

  @Input() control = new FormControl();

  @Input() displayToggler = false;

  @Input() inputReadOnly = false;

  @Output() valueChange = new EventEmitter();

  dateValue = null;

  constructor() {
  }

  @Input()
  get value() {
    return this.dateValue;
  }

  set value(data) {
    if (data) {
      if (data.value) {
        this.dateValue = data.value;
        return;
      }
    }
    this.dateValue = data;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value) {
      const { currentValue } = changes.value;
      if (currentValue === null) {
        console.log(this.dateValue);
      }
    }
  }

  ngOnInit() {
  }

  onMouseDown(datePicker) {
    datePicker.open();
  }

  onDateChange(event) {
    this.onValueChange(event);
  }

  onDateInput(event) {
    this.value = event.value;
  }

  onValueChange(event) {
    this.valueChange.emit(event);
  }

  onKeyUp(event) {
    if (event.key === 'Control') {
      this.checkCtrl = false;
    }
  }

  onKeyDown(event) {
    const { target, key } = event;
    const { value } = target;
    if (key === 'Control') {
      this.checkCtrl = true;
    }
    if (!this.checkCtrl) {
      if (key.length === 1) {
        if (value.length > 10 || !key.match(/[0-9\-\/]/)) {
          event.preventDefault();
          return;
        }
        if (value.length === 2 || value.length === 5) {
          event.preventDefault();
          target.value += '/';
          return;
        }
        if (key < '0' || key > '9') {
          event.preventDefault();
          return;
        }
        return;
      }
    }
  }

  onInput(event) {
    const { value } = event.target;
    if (value === '') {
      this.valueChange.emit(value);
    }
  }
}

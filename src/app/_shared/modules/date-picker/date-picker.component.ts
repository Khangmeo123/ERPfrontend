import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DEFAULT_DATE_FORMAT, OUTPUT_DATE_FORMAT } from './date-picker.formats';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
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

  @Input() model: any;

  @Input() disabled: boolean = false;

  @Input() displayToggler = true;

  @Input() inputReadOnly = false;

  @Output() valueChange = new EventEmitter();

  @Input() value: string = '';

  @Input() small: boolean = false;

  dateValue = null;

  constructor() {
  }

  get date() {
    return this.dateValue;
  }

  set date(value) {
    this.dateValue = value;
    const datePipe = new DatePipe('en-US');
    this.control.setValue(
      datePipe.transform(value, OUTPUT_DATE_FORMAT),
    );
    if (value && value._i) {
      if (value._i.length) {
        if (value._i.length === 10) {
          this.valueChange.emit(this.control.value);
          return;
        }
        return;
      }
      this.valueChange.emit(this.control.value);
    }
  }

  onDateChange(datePicker) {
    datePicker.close();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value) {
      if (!changes.value.currentValue) {
        this.date = null;
      }
    }
    if (changes.control) {
      if (changes.control.currentValue) {
        if (changes.control.currentValue.value) {
          this.date = new Date(changes.control.currentValue.value);
        } else {
          this.date = null;
        }
      }
    }
  }

  ngOnInit() {
    if (this.control) {
      if (this.control.value) {
        this.date = new Date(this.control.value);
      }
    }
    if (this.model) {
      this.date = new Date(this.model);
    }
  }

  onMouseDown(datePicker) {
    this.openDatePicker(datePicker);
  }

  onKeyUp(event) {
    if (event.key === 'Control') {
      this.checkCtrl = false;
      return;
    }
    const { value } = event.target;
    if (value === '' || value === null) {
      this.date = null;
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

  openDatePicker(matDatePicker) {
    if (!this.disabled) {
      matDatePicker.open();
    }
  }
}

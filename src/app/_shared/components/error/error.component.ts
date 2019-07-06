import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  @Input()
  set placement(placement: string) {
    switch (placement.toLocaleLowerCase()) {
      case 'top':
        this._placement = 'tooltip-top';
        break;
      case 'bottom':
        this._placement = 'tooltip-bottom';
        break;
      case 'left':
        this._placement = 'tooltip-left';
        break;
      case 'right':
        this._placement = 'tooltip-right';
        break;
    }
  }
  get placement() {
    return this._placement;
  }
  @Input() property: string;
  @Input('formGroup')
  set formGroup(formGroup: FormGroup) {
    this._formGroup = formGroup;
  }
  get formGroup(): FormGroup {
    return this._formGroup;
  }
  private _formGroup: FormGroup;
  private _placement: string;
  private ErrorMessage: string;
  constructor() { }

  ngOnInit() {
  }

}


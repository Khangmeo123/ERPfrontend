import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: [
    './error.component.scss',
  ],
})
export class ErrorComponent implements OnInit {

  @Input()
  public property: string;

  public form: FormGroup;

  public placementValue: string;

  constructor() {
  }

  get formGroup(): FormGroup {
    return this.form;
  }

  @Input('formGroup')
  set formGroup(formGroup: FormGroup) {
    this.form = formGroup;
  }

  get control() {
    return this.form.controls[this.property];
  }

  get formErrors() {
    return this.form.get('errors') as FormGroup;
  }

  get errors() {
    if (this.control.errors) {
      return Object.entries(this.control.errors);
    }
    return [];
  }

  get placement() {
    return this.placementValue;
  }

  @Input()
  set placement(placement: string) {
    switch (placement.toLocaleLowerCase()) {
      case 'top':
        this.placementValue = 'tooltip-top';
        break;
      case 'bottom':
        this.placementValue = 'tooltip-bottom';
        break;
      case 'left':
        this.placementValue = 'tooltip-left';
        break;
      case 'right':
        this.placementValue = 'tooltip-right';
        break;
    }
  }

  ngOnInit() {
  }
}

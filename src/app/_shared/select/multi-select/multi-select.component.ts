import { Component, OnInit, Input } from '@angular/core';
import {IOption} from './multi-select.interfaces';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
})
export class MultiSelectComponent implements OnInit {

  @Input() options: IOption[] = [];

  constructor() { }

  ngOnInit() {
  }

}

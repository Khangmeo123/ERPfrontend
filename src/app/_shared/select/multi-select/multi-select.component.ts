import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ITreeNode} from '../tree-select/tree-select.interfaces';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MultiSelectComponent implements OnInit {

  isOpened = false;

  @Input() options: ITreeNode[] = [];

  @Output() output = new EventEmitter<ITreeNode[]>();

  private selectedValues: ITreeNode[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  get values() {
    return this.selectedValues;
  }

  get togglerClass() {
    return this.isOpened ? 'up' : 'down';
  }

  onKeyDown(event) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      this.isOpened = true;
      const list = event.target.nextElementSibling.nextElementSibling;
      if (list) {
        list.firstElementChild.focus();
      }
    }
  }

  onSelect(event) {

  }
}

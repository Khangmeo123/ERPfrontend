import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { toggleMenu } from '../../../../animations/toggleMenu';
import { ISelect } from '../../select.interface';
import { getListDirection } from '../../helpers';

@Component({
  selector: 'app-simple-select',
  templateUrl: './simple-select.component.html',
  styleUrls: ['./simple-select.component.scss'],
  animations: [
    toggleMenu,
  ],
})
export class SimpleSelectComponent implements OnInit, ISelect {
  @Input() list = [];

  selectedItem = null;

  isOpened = false;

  listDirection = 'down';

  isLoading = false;

  @Input() key = 'label';

  @Output() selectionChange = new EventEmitter();

  @Output() listOpen = new EventEmitter();

  constructor() {
  }

  get listState() {
    return this.isOpened ? 'opened' : 'closed';
  }

  get selectedText() {
    if (this.selectedItem) {
      return this.selectedItem[this.key];
    }
    return '';
  }

  @Input() valueSelector = (node) => node.id;

  beforeOpenList(event) {
    this.listDirection = getListDirection(event.target);
    this.isLoading = true;
    this.listOpen.emit(event);
  }

  beforeCloseList(event) {
  }

  toggleList(event) {
    if (this.isOpened) {
      this.beforeCloseList(event);
    } else {
      this.beforeOpenList(event);
    }
    this.isOpened = !this.isOpened;
  }

  closeList(event) {
    if (this.isOpened) {
      this.beforeCloseList(event);
      this.isOpened = false;
    }
  }

  onChange() {
  }

  onSelect(event) {
    const {data} = event;
    this.selectedItem = data;
    this.selectionChange.emit(this.valueSelector(data));
    this.isOpened = true;
  }

  onUnselect(event) {
  }

  openList(event) {
    if (!this.isOpened) {
      this.beforeOpenList(event);
      this.isOpened = true;
    }
  }

  ngOnInit() {
  }
}

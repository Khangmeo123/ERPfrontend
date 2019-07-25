import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, OnChanges } from '@angular/core';
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
export class SimpleSelectComponent implements OnInit, ISelect, OnChanges {
  @Input() list = [];

  @Input() initValue = null;

  @Input() selectedItem = null;

  @Input() disabled = false;

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
    return this.initValue;
  }

  set selectedText(value) {

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
    const { data } = event;
    this.selectedItem = data;
    this.selectionChange.emit(this.valueSelector(data));
    this.isOpened = false;
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes.initValue) {
      if (changes.initValue.currentValue.length === 0) {
        this.selectedItem = null;
        this.selectedText = '';
      }
    }
  }
}

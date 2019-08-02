import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ISelect } from '../../select.interface';
import { toggleMenu } from '../../../../animations/toggleMenu';
import { getListDirection } from '../../helpers';

@Component({
  selector: 'app-single-select',
  templateUrl: './single-select.component.html',
  styleUrls: ['./single-select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    toggleMenu,
  ],
})
export class SingleSelectComponent implements OnInit, ISelect, OnChanges {
  @Input() initialValue = '';

  @Input() list = [];

  @Input() selectedList = [];

  @Input() key = 'label';

  @Input() disabled = false;

  @Output() search = new EventEmitter();

  @Output() listOpen = new EventEmitter();

  @Output() selectionChange = new EventEmitter();

  listDirection = 'down';

  isOpened = false;

  isLoading = false;

  constructor() {
  }

  get listState() {
    return this.isOpened ? 'opened' : 'closed';
  }

  get hasSelected() {
    return this.selectedList && this.selectedList.length;
  }

  get hasData() {
    return this.list && this.list.length;
  }

  get selectedText() {
    if (this.selectedList) {
      if (this.hasSelected) {
        return this.selectedList[0][this.key];
      }
    }
    return this.initialValue;
  }

  set selectedText(value) {

  }

  @Input() valueSelector = (node) => node.id;

  ngOnInit() {
  }

  closeList(event) {
    if (this.isOpened) {
      this.beforeCloseList(event);
      this.isOpened = false;
    }
  }

  beforeCloseList(event) {
  }

  unselect(event) {
    const {data} = event;
    this.selectedList = [];
    this.list = [
      ...this.list,
      data,
    ];
    this.onChange();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.list || changes.selectedList) {
      this.isLoading = false;
    }
    if (changes.initialValue) {
      if (!changes.initialValue.currentValue) {
        this.selectedList = null;
        this.selectedText = '';
      }
    }
  }

  onChange() {
    this.isOpened = false;
    this.selectionChange.emit(
      this.selectedList.map(this.valueSelector),
    );
  }

  select(event) {
    const {data, index} = event;
    if (this.selectedList.length) {
      if (this.selectedList[0].id === data.id) {
        return this.unselect(event);
      }
    }
    this.list = [
      ...this.list.slice(0, index),
      ...this.list.slice(index + 1),
      ...this.selectedList,
    ];
    this.selectedList[0] = data;
    return this.onChange();
  }

  onSelect(node) {
  }

  onUnselect(node) {
  }

  openList(event) {
    if (!this.isOpened) {
      this.beforeOpenList(event);
      this.isOpened = true;
    }
  }

  beforeOpenList(event) {
    this.listDirection = getListDirection(event.target);
    this.isLoading = true;
    this.listOpen.emit(event);
  }

  toggleList(event) {
    if (this.isOpened) {
      this.beforeCloseList(event);
    } else {
      this.beforeOpenList(event);
    }
    this.isOpened = !this.isOpened;
  }
}

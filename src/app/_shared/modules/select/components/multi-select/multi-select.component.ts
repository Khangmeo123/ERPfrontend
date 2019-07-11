import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {ISelect} from '../../select.interface';
import {getListDirection} from '../../helpers';
import {toggleMenu} from '../../../../animations/toggleMenu';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    toggleMenu,
  ],
})
export class MultiSelectComponent implements OnInit, ISelect, OnChanges {

  @Input() list = [];

  @Input() selectedList = [];

  @Output() selectionChange = new EventEmitter();

  @Output() listOpen = new EventEmitter();

  @Output() search = new EventEmitter();

  @Input() key = 'label';

  isOpened = false;

  listDirection = 'down';

  isLoading = false;

  constructor() {
  }

  get listState() {
    return this.isOpened ? 'opened' : 'closed';
  }

  get selectedText() {
    return `${this.selectedList.length} selected`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.list || changes.selectedList) {
      this.isLoading = false;
    }
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

  onChange() {
    this.selectionChange.emit(
      this.selectedList.map(this.valueSelector),
    );
  }

  onSelect(event) {
  }

  onUnselect(event) {
  }

  openList(event) {
    if (!this.isOpened) {
      this.beforeOpenList(event);
      this.isOpened = true;
    }
  }

  toggleList(event) {
    if (this.isOpened) {
      this.beforeCloseList(event);
    } else {
      this.beforeOpenList(event);
    }
    this.isOpened = !this.isOpened;
  }

  beforeCloseList(event) {
  }

  select(event) {
    const {
      data,
      index,
    } = event;
    this.list = [
      ...this.list.slice(0, index),
      ...this.list.slice(index + 1),
    ];
    this.selectedList = [
      ...this.selectedList,
      data,
    ];
    this.onChange();
  }

  unselect({index, data}) {
    this.selectedList = [
      ...this.selectedList.slice(0, index),
      ...this.selectedList.slice(index + 1),
    ];
    this.list = [
      ...this.list,
      data,
    ];
    this.onChange();
  }

  beforeOpenList(event) {
    this.listDirection = getListDirection(event.target);
    this.isLoading = true;
    this.listOpen.emit(event);
  }
}
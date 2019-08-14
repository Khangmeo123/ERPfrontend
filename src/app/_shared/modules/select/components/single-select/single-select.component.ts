import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ISelect } from '../../select.interface';
import { toggleMenu } from '../../../../animations/toggleMenu';
import { getListDirection } from '../../helpers';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-single-select',
  templateUrl: './single-select.component.html',
  styleUrls: [
    './single-select.component.scss',
  ],
  encapsulation: ViewEncapsulation.None,
  animations: [
    toggleMenu,
  ],
})
export class SingleSelectComponent implements OnInit, ISelect, OnChanges {

  @Input() initialValue = null;

  @Input() list = [];

  @Input() selectedList = [];

  @Input() key = 'label';

  @Input() disabled = false;

  @Output() search = new EventEmitter();

  @Output() listOpen = new EventEmitter();

  @Output() selectionChange = new EventEmitter();

  listDirection = 'down';

  @Input() direction: string = 'auto';

  isOpened = false;

  isLoading = false;

  currentValue: string;

  @Input() clearable: boolean = false;

  @Output() clear: EventEmitter<void> = new EventEmitter<void>();

  public id: string;

  constructor() {
    this.id = Guid.create().toString();
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
    const { data } = event;
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
      if (changes.list) {
        if (changes.list.currentValue && changes.list.currentValue.length) {
          this.list = [
            ...this.list,
          ];
        }
      }
      if (changes.selectedList) {
        if (changes.selectedList.currentValue && changes.selectedList.currentValue.length) {
          this.selectedList = [
            ...this.selectedList,
          ];
        }
      }
    }
    if (changes.initialValue) {
      if (!changes.initialValue.currentValue) {
        this.selectedList = null;
        this.initialValue = null;
      } else {
        const pattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        if (pattern.test(changes.initialValue.currentValue)) {
          this.initialValue = this.currentValue;
        }
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
    const { data, index } = event;
    if (this.hasSelected) {
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
    this.currentValue = data[this.key];
    this.initialValue = data[this.key];
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
    if (this.direction === 'auto') {
      this.listDirection = getListDirection(event.target);
    } else {
      this.listDirection = this.direction;
    }
    this.isLoading = true;
    this.listOpen.emit(event);
  }

  toggleList(event) {
    if (this.isOpened) {
      this.closeList(event);
    } else {
      this.openList(event);
    }
  }

  onClear() {
    this.initialValue = null;
    this.list = [
      ...this.list,
      ...this.selectedList,
    ];
    this.selectedList = [];
    this.clear.emit();
  }

  onClickOutside(event) {
    if (event.id === this.id) {
      return;
    }
    this.closeList(event);
  }

  onHeadClick(event) {
    event.id = this.id;
    this.toggleList(event);
  }
}

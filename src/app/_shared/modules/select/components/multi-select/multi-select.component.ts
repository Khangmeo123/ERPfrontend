import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {ISelect} from '../../select.interface';
import {getListDirection} from '../../helpers';
import {toggleMenu} from '../../../../animations/toggleMenu';
import { Guid } from 'guid-typescript';

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
  @Input() initialValue = 0;

  @Input() list = [];

  @Input() selectedList = [];

  @Output() selectionChange = new EventEmitter();

  @Output() listOpen = new EventEmitter();

  @Output() search = new EventEmitter();

  @Input() key = 'label';

  isOpened = false;

  @Input() disabled = false;

  listDirection = 'down';
  /**
   * down: List always open down
   *
   * up: List always open up
   *
   * auto: Recalculate the direction before open list
   */
  @Input() direction: string = 'down';


  isLoading = false;

  @Output() clear: EventEmitter<void> = new EventEmitter<void>();

  public id: string;

  constructor() {
    this.id = Guid.create().toString();
  }

  get listState() {
    return this.isOpened ? 'opened' : 'closed';
  }

  get selectedText() {
    if (this.selectedList) {
      if (this.selectedList.length === 1) {
        return this.selectedList[0][this.key];
      }
      return `${this.selectedList.length} selected`;
    }
    return `${this.initialValue} selected`;
  }

  get hasSelected() {
    return this.selectedList && this.selectedList.length;
  }

  get hasData() {
    return this.list && this.list.length;
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
      this.closeList(event);
    } else {
      this.openList(event);
    }
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

  unselect(event) {
    const {index, data} = event;
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
    if (this.direction === 'auto') {
      this.listDirection = getListDirection(event.target);
    } else {
      this.listDirection = this.direction;
    }
    this.isLoading = true;
    this.listOpen.emit(event);
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

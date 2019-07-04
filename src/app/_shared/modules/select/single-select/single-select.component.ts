import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {IListItem} from '../select.interfaces';

@Component({
  selector: 'app-single-select',
  templateUrl: './single-select.component.html',
  styleUrls: [
    '../select.scss',
    './single-select.component.scss',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class SingleSelectComponent implements OnInit {
  @Input() options: IListItem[] = [];
  @Input() selectedItem: IListItem = null;

  @Input() selectedLabel = 'Selected';
  @Input() availableLabel = 'Available';
  @Input() selectedTextLabel = 'selected';

  @Output() selectionChange = new EventEmitter<any>();

  @Output() search = new EventEmitter<string>();

  private isOpened = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  get toggleClass() {
    return this.isOpened ? 'up' : 'down';
  }

  onKeyDown(event) {
    if (event.key.startsWith('Arrow')) {
      this.toggleList();
    }
  }

  toggleList() {
    this.isOpened = !this.isOpened;
  }

  get selectedText() {
    if (this.selectedItem && this.selectedItem.label) {
      return this.selectedItem.label;
    }
    return `0 ${this.selectedLabel}`;
  }

  copyToClipboard(event) {
    const text = event.target.previousSibling.innerText;
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  }

  onChange(event) {
    const {target: {value}} = event;
    this.search.emit(value);
  }

  onSelect(event) {
    const {value} = event;
    const selectedItem = this.options.find((option) => option.value === value);
    const index = this.options.indexOf(selectedItem);
    const currentItem = this.selectedItem;
    this.selectedItem = selectedItem;
    if (currentItem) {
      this.options = [
        ...this.options.slice(0, index),
        ...this.options.slice(index + 1),
        currentItem,
      ];
    } else {
      this.options = [
        ...this.options.slice(0, index),
        ...this.options.slice(index + 1),
      ];
    }
  }

  onUnselect() {
    this.options = [
      ...this.options,
      this.selectedItem,
    ];
    this.selectedItem = null;
  }

  closeList() {
    if (this.isOpened) {
      this.isOpened = false;
    }
  }

  openList() {
    if (!this.isOpened) {
      this.isOpened = true;
    }
  }
}

import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {IListItem} from '../select.interfaces';
import {SelectComponent} from '../select.component';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: [
    '../select.scss',
    './multi-select.component.scss',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class MultiSelectComponent extends SelectComponent implements OnInit {
  @Input() options: IListItem[] = [];
  @Input() values: any[] = [];

  @Input() selectedLabel = 'Selected';
  @Input() availableLabel = 'Available';
  @Input() selectedTextLabel = 'selected';

  @Output() selectionChange = new EventEmitter<any>();

  @Output() search = new EventEmitter<string>();

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

  get selectedText() {
    return `${this.values.length} ${this.selectedTextLabel}`;
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

  onSelect({value}) {
    const selectedItem = this.options.find((option) => option.value === value);
    const index = this.options.indexOf(selectedItem);
    this.values = [
      ...this.values,
      selectedItem,
    ];
    this.options = [
      ...this.options.slice(0, index),
      ...this.options.slice(index + 1),
    ];
  }

  onUnselect(event) {
    const {target: {value}} = event;
    const unselectedItem = this.values.find((option) => option.value === value);
    const index = this.values.indexOf(unselectedItem);
    this.values = [
      ...this.values.slice(0, index),
      ...this.values.slice(index + 1),
    ];
    this.options = [
      ...this.options,
      unselectedItem,
    ];
  }
}

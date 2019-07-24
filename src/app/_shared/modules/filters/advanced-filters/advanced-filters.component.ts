import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FilterType } from '../../../models/filters/FilterType';
import { DateFilter } from '../../../models/filters/DateFilter';
import { TextFilter } from '../../../models/filters/TextFilter';
import { NumberFilter } from '../../../models/filters/NumberFilter';
import { toggleMenu } from '../../../animations/toggleMenu';

@Component({
  selector: 'app-advanced-filters',
  templateUrl: './advanced-filters.component.html',
  styleUrls: ['./advanced-filters.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    toggleMenu,
  ],
})
export class AdvancedFiltersComponent implements OnInit, OnChanges {

  @Input() filter;

  @ViewChild('pane', {static: false}) pane;

  @ViewChild('toggler', {static: false}) toggler;

  @Output() changeFilter = new EventEmitter();

  public inputType: string = '';

  type = null;

  dropdownDirection = 'left';

  filterValue;

  protected types: FilterType[] = [];

  protected isOpened = false;

  constructor() {
  }

  get isDateFilter() {
    return this.filter instanceof DateFilter;
  }

  get isNumberFilter() {
    return this.filter instanceof NumberFilter;
  }

  get isTextFilter() {
    return this.filter instanceof TextFilter;
  }

  get listState() {
    return this.isOpened ? 'opened' : 'closed';
  }

  get filterTypeSign() {
    if (this.type) {
      return this.type.sign;
    }
    return null;
  }

  ngOnChanges(changes): void {
    if (changes.filter) {
      this.filterValue = null;
    }
  }

  ngOnInit() {
    if (this.isDateFilter) {
      this.inputType = 'text';
      this.types = DateFilter.types;
    } else if (this.isTextFilter) {
      this.inputType = 'text';
      this.types = TextFilter.types;
    } else if (this.isNumberFilter) {
      this.inputType = 'number';
      this.types = NumberFilter.types;
    }
    if (this.type === null) {
      this.type = this.types[0];
    }
  }

  beforeOpenList() {
    const style = window.getComputedStyle(this.pane.nativeElement, null);
    const width = parseInt(style.width, 10);
    const {left} = this.toggler.nativeElement.getBoundingClientRect();
    if (left + width > window.innerWidth) {
      this.dropdownDirection = 'right';
    } else {
      this.dropdownDirection = 'left';
    }
  }

  beforeCloseList() {
  }

  toggleList() {
    if (this.isOpened) {
      this.beforeCloseList();
    } else {
      this.beforeOpenList();
    }
    this.isOpened = !this.isOpened;
  }

  onApplyFilter(value) {
    this.changeFilter.emit(value);
  }

  updateFilter() {
    this.filter[this.type.code] = this.filterValue;
  }

  onSelectType(t: FilterType) {
    this.type = this.types.find((type) => type.code === t.code);
    for (const property in this.filter) {
      if (this.filter.hasOwnProperty(property)) {
        this.filter[property] = null;
      }
    }
    this.updateFilter();
    this.onApplyFilter(this.filterValue);
    this.toggleList();
  }

  closeDropdown() {
    if (this.isOpened) {
      this.isOpened = !this.isOpened;
    }
  }

  onKeyUp(event) {
    const {value} = event.target;
    this.updateFilter();
    if (value === '') {
      this.onApplyFilter(value);
    } else {
      if (event.key === 'Enter') {
        this.onApplyFilter(value);
      }
    }
  }
}

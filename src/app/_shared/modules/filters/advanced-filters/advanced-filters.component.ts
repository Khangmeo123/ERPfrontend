import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
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
export class AdvancedFiltersComponent implements OnInit {

  @Input() filter;
  @ViewChild('pane', { static: false }) pane;
  @ViewChild('toggler', { static: false }) toggler;

  @Output() changeFilter = new EventEmitter();
  public typeInput: string = '';
  public valueInput: any;
  type = null;
  dropdownDirection = 'left';
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

  get filterTypes() {
    return this.types.map((type) => {
      return {
        label: type.languages.en,
        value: type.code,
      };
    });
  }

  get filterTypeSign() {
    if (this.type) {
      return this.type.sign;
    }
    return null;
  }

  ngOnInit() {
    if (this.isDateFilter) {
      this.typeInput = 'text';
      this.types = DateFilter.types;
    } else if (this.isTextFilter) {
      this.typeInput = 'text';
      this.types = TextFilter.types;
    } else if (this.isNumberFilter) {
      this.typeInput = 'number';
      this.types = NumberFilter.types;
    }
    if (this.type === null) {
      this.type = this.types[0];
      this.type = this.types[0];
    }
  }

  beforeOpenList() {
    const style = window.getComputedStyle(this.pane.nativeElement, null);
    const width = parseInt(style.width, 10);
    const { left } = this.toggler.nativeElement.getBoundingClientRect();
    if (left + width > window.innerWidth) {
      this.dropdownDirection = 'right';
    } else {
      this.dropdownDirection = 'left';
    }
  }

  beforeCloseList() {

  }

  toggleList() {
    if (!this.isOpened) {
      this.beforeOpenList();
    } else {
      this.beforeCloseList();
    }
    this.isOpened = !this.isOpened;
  }

  onApplyFilter(event) {
    this.types.forEach(({ code }) => {
      if (this.type.code === code) {
        if (event && event.target) {
          this.filter[code] = event.target.value;
          this.valueInput = event.target.value;
        } else if (event) {
          this.filter[code] = event;
          this.valueInput = event;
        }
      } else {
        this.filter[code] = null;
      }
    });
    this.changeFilter.emit();
  }

  onSelectType(item) {
    this.type = this.types.find((type) => type.code === item.value);
    for (const property in this.filter) {
      if (this.filter.hasOwnProperty(property)) {
        this.filter[property] = null;
      }
    }
    this.filter[this.type.code] = this.valueInput;
    this.changeFilter.emit();
    this.toggleList();
  }

  closeDropdown() {
    if (this.isOpened) {
      this.isOpened = !this.isOpened;
    }
  }

  onInput(event) {
    if (event.target.value === '') {
      this.onApplyFilter('');
    }
  }
}

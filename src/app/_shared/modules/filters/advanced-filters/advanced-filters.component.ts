import { Component, Input, OnInit, Output, ViewChild, ViewEncapsulation, EventEmitter } from '@angular/core';
import { FilterType } from '../../../models/filters/FilterType';
import { DateFilter } from '../../../models/filters/DateFilter';
import { TextFilter } from '../../../models/filters/TextFilter';
import { NumberFilter } from '../../../models/filters/NumberFilter';
import { toggleMenu } from '../../../animations/toggle-menu';

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
  @Input() searchEntity;
  @ViewChild('pane', { static: false }) pane;
  @ViewChild('toggler', { static: false }) toggler;

  @Output() changeFilter = new EventEmitter();

  protected types: FilterType[] = [];

  protected isOpened = false;
  public listValueFilter: Array<any> = [];
  public typeInput: string = '';
  public valueInput: any;
  type = null;

  dropdownDirection = 'left';

  constructor() {
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


  get isDateFilter() {
    return this.filter instanceof DateFilter;
  }

  get isNumberFilter() {
    return this.filter instanceof NumberFilter;
  }

  get isTextFilter() {
    return this.filter instanceof TextFilter;
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

  get selectedType() {
    return this.type.code;
  }

  set selectedType(code) {
    this.type = this.types.find((type) => type.code === code);
  }

  get filterTypeSign() {
    if (this.type) {
      return this.type.sign;
    }
    return null;
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
    const keys = Object.keys(this.filter);
    for (const property in this.filter) {
      if (this.filter.hasOwnProperty(property)) {
        this.filter[property] = null;
      }
    }
    this.filter[this.type.code] = this.valueInput;
    this.toggleList();
  }

  closeDropdown() {
    if (this.isOpened) {
      this.isOpened = !this.isOpened;
    }
  }
}

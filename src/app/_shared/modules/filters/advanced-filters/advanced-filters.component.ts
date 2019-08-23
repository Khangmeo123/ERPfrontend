import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
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
export class AdvancedFiltersComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() appendTo: string = 'body';

  @Input() filter;

  @Input() defaultType: string = 'equal';

  @ViewChild('pane', {static: false}) pane;

  @ViewChild('toggler', {static: false}) toggler;

  @Output() changeFilter = new EventEmitter();

  public inputType: string = '';

  width: any = '100%';

  type = null;

  dropdownDirection = 'left';

  filterValue;

  types: FilterType[] = [];

  isOpened = false;

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

  ngAfterViewInit(): void {
    if (this.appendTo === 'body') {
      this.onWindowResize();
    }
  }

  ngOnChanges(changes): void {
    if (changes.filter) {
      this.filterValue = null;
    }
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    if (this.toggler) {
      const {nativeElement} = this.toggler;
      this.width = window.getComputedStyle(nativeElement).width;
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
      this.type = this.types.find((type: FilterType) => {
        return type.code === this.defaultType;
      });
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
    if (!this.isOpened) {
      this.beforeOpenList();
    } else {
      this.beforeCloseList();
    }
    this.isOpened = !this.isOpened;
  }

  onApplyFilter(value) {
    this.filter[this.type.code] = value;
    this.filterValue = value;
    this.changeFilter.emit();
  }

  onSelectType(t: FilterType) {
    this.type = this.types.find((type) => type.code === t.code);
    for (const property in this.filter) {
      if (this.filter.hasOwnProperty(property)) {
        this.filter[property] = null;
      }
    }
    this.filter[this.type.code] = this.filterValue;
    this.changeFilter.emit();
    this.toggleList();
  }

  onChange(event) {
    const {value} = event.target;
    this.onApplyFilter(value);
  }

  onKeyUp(event) {
    const {value} = event.target;
    if (value === '' || value === null) {
      this.onApplyFilter(null);
    }
  }
}

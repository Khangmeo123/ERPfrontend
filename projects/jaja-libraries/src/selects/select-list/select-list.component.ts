import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { ISelect } from '../ISelect';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'jaja-select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectListComponent),
      multi: true,
    },
  ],
})
export class SelectListComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy, ISelect {
  @Input() appendTo: string = null;

  @Input() list: any[];

  @Input() key: string = 'id';

  @Input() placeholder: string = 'Enum List Select';

  @Input() clearable: boolean = true;

  @Output() clear: EventEmitter<void> = new EventEmitter<void>();

  @Input() searchable: boolean = false;

  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  // tslint:disable-next-line:no-output-native
  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  @Output() openList: EventEmitter<any> = new EventEmitter<any>();

  @Output() closeList: EventEmitter<any> = new EventEmitter<any>();

  @Input() disabled: boolean = false;

  @ContentChild('label', {static: false}) label: TemplateRef<ElementRef>;

  @ContentChild('option', {static: false}) option: TemplateRef<ElementRef>;

  isOpened: boolean = false;

  searchSubject: Subject<string> = new Subject<string>();

  subscription: Subscription = new Subscription();

  selectedItem: any = null;

  loading: boolean = false;

  constructor() {
  }

  @Input()
  get value() {
    if (this.selectedItem) {
      return this.selectedItem[this.key];
    }
    return null;
  }

  set value(value) {
    this.selectedItem = this.list.find((item) => item[this.key] === value);
    this.onChange(value);
  }

  onChange(event) {
    this.change.emit(event);
  }

  onTouch(event) {
  }

  ngOnInit() {
    if (this.value) {
      this.selectedItem = this.list.find((item) => item[this.key] === this.value);
    }
    if (this.searchable) {
      const searchSubscription: Subscription = this.searchSubject.pipe(
        debounceTime(400),
        distinctUntilChanged(),
      )
        .subscribe(
          (event) => {
            this.search.emit(event);
            this.loading = true;
          },
        );

      this.subscription.add(searchSubscription);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.list) {
      this.loading = false;
    }
    if (changes.value || changes.list) {
      this.selectedItem = this.list.find((item) => item[this.key] === this.value);
    }
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSelect(item, event) {
    this.selectedItem = item;
    this.onChange(item[this.key]);
    this.onTouch(event);
    this.isOpened = false;
  }

  onClear(event) {
    event.stopPropagation();
    this.value = undefined;
  }

  onSearch(event): void {
    this.searchSubject.next(event.target.value);
  }

  writeValue(value: any): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  toggle() {
    this.isOpened = !this.isOpened;
    if (this.isOpened) {
      this.openList.emit();
    } else {
      this.closeList.emit();
    }
  }
}

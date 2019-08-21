import {
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
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ISearchEntity } from '../../entities/ISearchEntity';

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
export class SelectListComponent implements OnInit, OnChanges, OnDestroy, ISelect, ControlValueAccessor {

  @Input() appendTo: string = null;

  @Input() renewOnOpen: boolean = true;

  @Input() key: string = null;

  @Input() display: string = null;

  @Input() placeholder: string = '';

  @Input() searchable: boolean = false;

  // @Input() display: string = 'name';

  // tslint:disable-next-line:no-output-native
  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  @Input() searchField: string = 'name';

  @Input() searchType: string = 'startsWith';

  @Input() searchEntity: any;

  @Input() disabled: boolean = false;

  @Input() list: any[] = [];

  @ContentChild('label', {static: false}) label: TemplateRef<ElementRef>;

  @ContentChild('option', {static: false}) option: TemplateRef<ElementRef>;

  public searchSubject: Subject<string> = new Subject<string>();

  public subscription: Subscription = new Subscription();

  public selectedItem: any = null;

  public loading: boolean = false;

  constructor() { }

  @Input()
  get value() {
    if (this.selectedItem) {
      return this.selectedItem[this.key];
    }
    return null;
  }

  set value(value) {
    this.selectedItem = this.list.find((item) => this.getValue(item) === value);
  }

  @Input()
  getList(searchEntity?: ISearchEntity): Observable<any[]> {
    return new Observable<any[]>();
  }

  onChange(event) {
    this.change.emit(event);
  }

  onTouch(event) {
  }


  ngOnInit() {
    if (this.value) {
      this.selectedItem = this.list.find((item) => this.getValue(item) === this.value);
    }

    if (this.searchable) {
      const searchSubscription: Subscription = this.searchSubject.pipe(
        debounceTime(400),
        distinctUntilChanged(),
      )
        .subscribe(
          (event) => {
            this.searchEntity[this.searchField][this.searchType] = event;
            this.reloadList();
          },
        );

      this.subscription.add(searchSubscription);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.value) {
      if (!changes.value.firstChange) {
        this.selectedItem = this.list.find((item) => this.getValue(item) === this.value);
      }
    }
  }

  getValue(item) {
    if (this.key && item.hasOwnProperty(this.key)) {
      return item[this.key];
    }
    return item;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSelect(item, event) {
    const value: any = this.getValue(item);
    if (value !== this.value) {
      this.selectedItem = item;
      this.onChange(value);
    }
    this.onTouch(event);
  }

  onClear(event) {
    event.preventDefault();
    event.stopPropagation();
    this.selectedItem = null;
    this.display = null;
    this.onChange(null);
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

  reloadList() {
    this.loading = true;
    this.getList(this.searchEntity)
      .subscribe(
        (list: any[]) => {
          this.list = list;
          this.loading = false;
        },
      );
  }

  onToggle(isOpened) {
    if (isOpened) {
      if (this.renewOnOpen) {
        if (this.searchEntity) {
          this.searchEntity[this.searchField][this.searchType] = null;
        }
        this.reloadList();
      }
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}

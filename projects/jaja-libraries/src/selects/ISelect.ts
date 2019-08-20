import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Subject } from 'rxjs';

export interface ISelect extends ControlValueAccessor {
  /**
   * Data source
   */
  list: any[];

  /**
   * Loading state
   */
  loading: boolean;

  /**
   * Customize data value
   */
  key: string;

  /**
   * Select
   */
  placeholder: string;

  /**
   * Searchable select
   */
  searchable: boolean;

  /**
   *
   */
  searchSubject: Subject<string>;

  /**
   * Dropdown container append to body or not
   */
  appendTo: string;

  onClear(event): void;

  onSearch(event): void;
}

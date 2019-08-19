import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Subject } from 'rxjs';

export interface ISelect extends ControlValueAccessor {
  /**
   * Is this select box clearable?
   */
  clearable: boolean;

  /**
   * Clear event
   */
  clear: EventEmitter<void>;

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
   * Customize data display
   */
  display: string;

  /**
   * Select
   */
  placeholder: string;

  /**
   * Searchable select
   */
  searchable: boolean;

  /**
   * Search event emitter for searchable select
   */
  search?: EventEmitter<string>;

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

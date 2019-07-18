import {FilterType} from './FilterType';
import {Filter} from './Filter';

export class TextFilter extends Filter {
  constructor(textFilter?) {
    super();
    this.equal = textFilter !== undefined && textFilter.equal !== undefined ? textFilter.equal : null;
    this.notEqual = textFilter !== undefined && textFilter.notEqual !== undefined ? textFilter.notEqual : null;
    this.startsWith = textFilter !== undefined && textFilter.startsWith !== undefined ? textFilter.startsWith : null;
    this.endsWith = textFilter !== undefined && textFilter.endsWith !== undefined ? textFilter.endsWith : null;
    this.contains = textFilter !== undefined && textFilter.contains !== undefined ? textFilter.contains : null;
    this.notContains = textFilter !== undefined && textFilter.notContains !== undefined ? textFilter.notContains : null;
  }

  static types: FilterType[] = [
    {
      sign: '=',
      code: 'equal',
      languages: {
        en: 'Equals',
        vi: 'Bằng',
      },
    },
    {
      sign: '!=',
      code: 'notEqual',
      languages: {
        en: 'Not equals',
        vi: 'Không bằng',
      },
    },
    {
      sign: 'SW',
      code: 'startsWith',
      languages: {
        en: 'Starts with',
        vi: 'Bắt đầu với',
      },
    },
    {
      sign: 'EW',
      code: 'endsWith',
      languages: {
        en: 'Ends with',
        vi: 'Kết thúc với',
      },
    },
    {
      sign: 'CT',
      code: 'contains',
      languages: {
        en: 'Contains',
        vi: 'Chứa',
      },
    },
    {
      sign: 'NC',
      code: 'notContains',
      languages: {
        en: 'Not contains',
        vi: 'Không chứa',
      },
    },
  ];
  equal: string = null;
  notEqual: string = null;
  startsWith: string = null;
  endsWith: string = null;
  contains: string = null;
  notContains: string = null;
}

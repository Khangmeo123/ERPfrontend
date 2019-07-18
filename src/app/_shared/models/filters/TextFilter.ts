import {FilterType} from './FilterType';
import {Filter} from './Filter';

export class TextFilter extends Filter {
  constructor(textFilter?) {
    super();
    this.equal = textFilter !== undefined && textFilter.equal !== undefined ? textFilter.equal : null;
    this.notEqual = textFilter !== undefined && textFilter.notEqual !== undefined ? textFilter.notEqual : null;
    this.sw = textFilter !== undefined && textFilter.sw !== undefined ? textFilter.sw : null;
    this.ew = textFilter !== undefined && textFilter.ew !== undefined ? textFilter.ew : null;
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
      code: 'sw',
      languages: {
        en: 'Starts with',
        vi: 'Bắt đầu với',
      },
    },
    {
      sign: 'EW',
      code: 'ew',
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
  sw: string = null;
  ew: string = null;
  contains: string = null;
  notContains: string = null;
}

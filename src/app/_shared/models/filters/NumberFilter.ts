import {FilterType} from './FilterType';
import {Filter} from './Filter';

export class NumberFilter extends Filter {
  constructor(numberFilter?) {
    super();
    this.equal = numberFilter !== undefined && numberFilter.equal !== undefined ? numberFilter.equal : null;
    this.greaterEqual = numberFilter !== undefined && numberFilter.greaterEqual !== undefined ? numberFilter.greaterEqual : null;
    this.greater = numberFilter !== undefined && numberFilter.greater !== undefined ? numberFilter.greater : null;
    this.lessEqual = numberFilter !== undefined && numberFilter.lessEqual !== undefined ? numberFilter.lessEqual : null;
    this.less = numberFilter !== undefined && numberFilter.less !== undefined ? numberFilter.less : null;
    this.notEqual = numberFilter !== undefined && numberFilter.notEqual !== undefined ? numberFilter.notEqual : null;
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
      sign: '<',
      code: 'less',
      languages: {
        en: 'Less than',
        vi: 'Bắt đầu với',
      },
    },
    {
      sign: '<=',
      code: 'lessEqual',
      languages: {
        en: 'Less than or equals',
        vi: 'Nhỏ hơn hoặc bằng',
      },
    },
    {
      sign: '>',
      code: 'greater',
      languages: {
        en: 'Greater than',
        vi: 'Lớn hơn',
      },
    },
    {
      sign: '>=',
      code: 'greaterEqual',
      languages: {
        en: 'Greater than or equals',
        vi: 'Lớn hơn hoặc bằng',
      },
    },
  ];
  equal: number = null;
  notEqual: number = null;
  less: number = null;
  lessEqual: number = null;
  greater: number = null;
  greaterEqual: number = null;
}

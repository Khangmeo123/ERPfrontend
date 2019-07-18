import {FilterType} from './FilterType';
import {Filter} from './Filter';

export class DateFilter extends Filter {
  constructor(dateFilter?) {
    super();
    this.equal = dateFilter !== undefined && dateFilter.equal !== undefined ? dateFilter.equal : null;
    this.notEqual = dateFilter !== undefined && dateFilter.notEqual !== undefined ? dateFilter.notEqual : null;
    this.less = dateFilter !== undefined && dateFilter.less !== undefined ? dateFilter.less : null;
    this.lessEqual = dateFilter !== undefined && dateFilter.lessEqual !== undefined ? dateFilter.lessEqual : null;
    this.greater = dateFilter !== undefined && dateFilter.greater !== undefined ? dateFilter.greater : null;
    this.greaterEqual = dateFilter !== undefined && dateFilter.greaterEqual !== undefined ? dateFilter.greaterEqual : null;
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
      code: 'nq',
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
        vi: 'Nhỏ hơn',
      },
    },
    {
      sign: '<=',
      code: 'lessEqual',
      languages: {
        en: 'Less or equals than',
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
        en: 'Greater or equals than',
        vi: 'Lớn hơn hoặc bằng',
      },
    },
  ];
  equal: string = null;
  notEqual: string = null;
  less: string = null;
  lessEqual: string = null;
  greater: string = null;
  greaterEqual: string = null;
}

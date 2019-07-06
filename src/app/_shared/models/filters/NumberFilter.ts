import {FilterType} from './FilterType';
import {Filter} from './Filter';

export class NumberFilter extends Filter {
  constructor(numberFilter?) {
    super();
    this.eq = numberFilter !== undefined && numberFilter.eq !== undefined ? numberFilter.eq : null;
    this.ge = numberFilter !== undefined && numberFilter.ge !== undefined ? numberFilter.ge : null;
    this.gt = numberFilter !== undefined && numberFilter.gt !== undefined ? numberFilter.gt : null;
    this.le = numberFilter !== undefined && numberFilter.le !== undefined ? numberFilter.le : null;
    this.lt = numberFilter !== undefined && numberFilter.lt !== undefined ? numberFilter.lt : null;
    this.ne = numberFilter !== undefined && numberFilter.ne !== undefined ? numberFilter.ne : null;
  }

  static types: FilterType[] = [
    {
      sign: '=',
      code: 'eq',
      languages: {
        en: 'Equals',
        vi: 'Bằng',
      },
    },
    {
      sign: '!=',
      code: 'ne',
      languages: {
        en: 'Not equals',
        vi: 'Không bằng',
      },
    },
    {
      sign: '<',
      code: 'lt',
      languages: {
        en: 'Less than',
        vi: 'Bắt đầu với',
      },
    },
    {
      sign: '<=',
      code: 'le',
      languages: {
        en: 'Less than or equals',
        vi: 'Nhỏ hơn hoặc bằng',
      },
    },
    {
      sign: '>',
      code: 'gt',
      languages: {
        en: 'Greater than',
        vi: 'Lớn hơn',
      },
    },
    {
      sign: '>=',
      code: 'ge',
      languages: {
        en: 'Greater than or equals',
        vi: 'Lớn hơn hoặc bằng',
      },
    },
  ];
  eq: number = null;
  ne: number = null;
  lt: number = null;
  le: number = null;
  gt: number = null;
  ge: number = null;
}

import {FilterType} from './FilterType';
import {Filter} from './Filter';

export class DateFilter extends Filter {
  constructor(dateFilter?) {
    super();
    this.eq = dateFilter !== undefined && dateFilter.eq !== undefined ? dateFilter.eq : null;
    this.ne = dateFilter !== undefined && dateFilter.ne !== undefined ? dateFilter.ne : null;
    this.lt = dateFilter !== undefined && dateFilter.lt !== undefined ? dateFilter.lt : null;
    this.le = dateFilter !== undefined && dateFilter.le !== undefined ? dateFilter.le : null;
    this.gt = dateFilter !== undefined && dateFilter.gt !== undefined ? dateFilter.gt : null;
    this.ge = dateFilter !== undefined && dateFilter.ge !== undefined ? dateFilter.ge : null;
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
      code: 'nq',
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
        vi: 'Nhỏ hơn',
      },
    },
    {
      sign: '<=',
      code: 'le',
      languages: {
        en: 'Less or equals than',
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
        en: 'Greater or equals than',
        vi: 'Lớn hơn hoặc bằng',
      },
    },
  ];
  eq: string = null;
  ne: string = null;
  lt: string = null;
  le: string = null;
  gt: string = null;
  ge: string = null;
}

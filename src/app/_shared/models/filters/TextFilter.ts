import { FilterType } from './FilterType';
import { Filter } from './Filter';

export class TextFilter extends Filter {
  constructor(textFilter?) {
    super();
    this.equal = textFilter !== undefined && textFilter.equal !== undefined ? textFilter.equal : null;
    this.ne = textFilter !== undefined && textFilter.ne !== undefined ? textFilter.ne : null;
    this.sw = textFilter !== undefined && textFilter.sw !== undefined ? textFilter.sw : null;
    this.ew = textFilter !== undefined && textFilter.ew !== undefined ? textFilter.ew : null;
    this.ct = textFilter !== undefined && textFilter.ct !== undefined ? textFilter.ct : null;
    this.nc = textFilter !== undefined && textFilter.nc !== undefined ? textFilter.nc : null;
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
      code: 'ne',
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
      code: 'ct',
      languages: {
        en: 'Contains',
        vi: 'Chứa',
      },
    },
    {
      sign: 'NC',
      code: 'nc',
      languages: {
        en: 'Not contains',
        vi: 'Không chứa',
      },
    },
  ];
  equal: string = null;
  ne: string = null;
  sw: string = null;
  ew: string = null;
  ct: string = null;
  nc: string = null;
}

export class FilterType {
  sign: string;
  code: string;
  languages: {
    en: string;
    vi: string;
  };

  constructor(filterType?: FilterType) {
    this.sign = filterType !== null && filterType !== undefined ? filterType.sign : null;
    this.code = filterType !== null && filterType !== undefined ? filterType.code : null;
  }
}

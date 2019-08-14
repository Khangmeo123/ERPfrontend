import {FilterType} from './FilterType';
import {Filter} from './Filter';
import {translate} from '../../../_helpers/string';

export class TextFilter extends Filter {
    static types: FilterType[] = [
        {
            sign: '=',
            code: 'equal',
            translate: translate('advancedFilter.greaterEqual'),
        },
        {
            sign: '!=',
            code: 'notEqual',
            translate: translate('advancedFilter.notEqual'),
        },
        {
            sign: 'SW',
            code: 'startsWith',
            translate: translate('advancedFilter.startsWith'),
        },
        {
            sign: 'EW',
            code: 'endsWith',
            translate: translate('advancedFilter.endsWith'),
        },
        {
            sign: 'CT',
            code: 'contains',
            translate: translate('advancedFilter.contains'),
        },
        {
            sign: 'NC',
            code: 'notContains',
            translate: translate('advancedFilter.notContains'),
        },
    ];
    equal: string = null;
    notEqual: string = null;
    startsWith: string = null;
    endsWith: string = null;
    contains: string = null;
    notContains: string = null;

    constructor(textFilter?) {
        super();
        this.equal = textFilter !== undefined && textFilter.equal !== undefined ? textFilter.equal : null;
        this.notEqual = textFilter !== undefined && textFilter.notEqual !== undefined ? textFilter.notEqual : null;
        this.startsWith = textFilter !== undefined && textFilter.startsWith !== undefined ? textFilter.startsWith : null;
        this.endsWith = textFilter !== undefined && textFilter.endsWith !== undefined ? textFilter.endsWith : null;
        this.contains = textFilter !== undefined && textFilter.contains !== undefined ? textFilter.contains : null;
        this.notContains = textFilter !== undefined && textFilter.notContains !== undefined ? textFilter.notContains : null;
    }
}

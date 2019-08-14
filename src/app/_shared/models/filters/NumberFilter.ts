import {FilterType} from './FilterType';
import {Filter} from './Filter';
import {translate} from '../../../_helpers/string';

export class NumberFilter extends Filter {
    static types: FilterType[] = [
        {
            sign: '=',
            code: 'equal',
            translate: translate('advancedFilter.equal'),
        },
        {
            sign: '!=',
            code: 'notEqual',
            translate: translate('advancedFilter.notEqual'),
        },
        {
            sign: '<',
            code: 'less',
            translate: translate('advancedFilter.less'),
        },
        {
            sign: '<=',
            code: 'lessEqual',
            translate: translate('advancedFilter.lessEqual'),
        },
        {
            sign: '>',
            code: 'greater',
            translate: translate('advancedFilter.greater'),
        },
        {
            sign: '>=',
            code: 'greaterEqual',
            translate: translate('advancedFilter.greaterEqual'),
        },
    ];
    equal: number = null;
    notEqual: number = null;
    less: number = null;
    lessEqual: number = null;
    greater: number = null;
    greaterEqual: number = null;

    constructor(numberFilter?) {
        super();
        this.equal = numberFilter !== undefined && numberFilter.equal !== undefined ? numberFilter.equal : null;
        this.greaterEqual = numberFilter !== undefined && numberFilter.greaterEqual !== undefined ? numberFilter.greaterEqual : null;
        this.greater = numberFilter !== undefined && numberFilter.greater !== undefined ? numberFilter.greater : null;
        this.lessEqual = numberFilter !== undefined && numberFilter.lessEqual !== undefined ? numberFilter.lessEqual : null;
        this.less = numberFilter !== undefined && numberFilter.less !== undefined ? numberFilter.less : null;
        this.notEqual = numberFilter !== undefined && numberFilter.notEqual !== undefined ? numberFilter.notEqual : null;
    }
}

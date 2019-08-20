import {FilterType} from './FilterType';
import {Filter} from './Filter';
import {translate} from '../../../_helpers/string';

export class DateFilter extends Filter {
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
    equal: string = null;
    notEqual: string = null;
    less: string = null;
    lessEqual: string = null;
    greater: string = null;
    greaterEqual: string = null;

    constructor(dateFilter?) {
        super();
        this.equal = dateFilter !== undefined && dateFilter.equal !== undefined ? dateFilter.equal : null;
        this.notEqual = dateFilter !== undefined && dateFilter.notEqual !== undefined ? dateFilter.notEqual : null;
        this.less = dateFilter !== undefined && dateFilter.less !== undefined ? dateFilter.less : null;
        this.lessEqual = dateFilter !== undefined && dateFilter.lessEqual !== undefined ? dateFilter.lessEqual : null;
        this.greater = dateFilter !== undefined && dateFilter.greater !== undefined ? dateFilter.greater : null;
        this.greaterEqual = dateFilter !== undefined && dateFilter.greaterEqual !== undefined ? dateFilter.greaterEqual : null;
    }
}

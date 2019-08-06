import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'TimeAgo'})
export class TimeAgoPipe implements PipeTransform {
    transform(value: any): string {
        switch (typeof value) {
            case 'number':
                break;
            case 'string':
                value = +new Date(value);
                break;
            case 'object':
                if (value.constructor === Date) value = value.getTime();
                break;
            default:
                value = +new Date();
        }
        let time_formats = [
            [60, 'giây trước', 1], // 60
            [120, '1 phút trước', '1 phút tới'], // 60*2
            [3600, ' phút trước', 60], // 60*60, 60
            [7200, '1 giờ trước', '1 giờ tới'], // 60*60*2
            [86400, 'giờ trước', 3600], // 60*60*24, 60*60
            [172800, 'ngày hôm qua', 'ngày mai'], // 60*60*24*2
            [604800, 'ngày trước', 86400], // 60*60*24*7, 60*60*24
            [1209600, 'tuần trước', 'tuần sau'], // 60*60*24*7*4*2
            [2419200, 'tuần trước', 'tuần sau'], // 60*60*24*7*4, 60*60*24*7
            [4838400, 'tháng trước', 'tháng sau'], // 60*60*24*7*4*2
            [29030400, 'tháng trước', 'tháng sau'], // 60*60*24*7*4*12, 60*60*24*7*4
            [58060800, 'năm trước', 'năm sau'], // 60*60*24*7*4*12*2
            [2903040000, 'năm trước', 'năm sau'], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
            [5806080000, 'thế kỉ trước', 'thế kỉ sau'], // 60*60*24*7*4*12*100*2
            [58060800000, 'thế kỉ trước', 'thế kỉ sau'] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
        ];
        let seconds = (+new Date() - value) / 1000,
            token = '',
            list_choice = 1;

        if (seconds == 0) {
            return 'Vừa xong'
        }
        if (seconds < 0) {
            return 'Vừa xong'
        }
        let i = 0,
            format;
        while (format = time_formats[i++])
            if (seconds < format[0]) {
                if (typeof format[2] == 'string')
                    return format[list_choice];
                else
                    return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
            }
        return value;
    }
}
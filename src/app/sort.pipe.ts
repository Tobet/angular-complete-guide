import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'sort',
    pure: false,
})
export class SortPipe implements PipeTransform {

    transform(value: any[], propName: string): unknown {

        if (value.length === 0 || propName === '') {
            return value;
        }

        return value.sort((el1: any, el2: any) => {

            if (el1[propName] > el2[propName]) {
                return 1;
            }

            if (el1[propName] < el2[propName]) {
                return -1;
            }

            return 0;
        });
    }

}

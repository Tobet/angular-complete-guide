import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
    name: 'reverse'
})
export class ReversePipe implements PipeTransform {

    transform(value: string): string {

        if (value === '') {
            return value;
        }

        let reversed = '';

        for (let i = value.length - 1; i >= 0; i--) {
            const char: string = value[i];
            reversed = reversed.concat(char);
        }

        return reversed;
    }


}

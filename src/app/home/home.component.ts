import {Component, OnDestroy, OnInit} from '@angular/core';

import {interval, Observable, Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

    private firstObsSubscription: Subscription;

    constructor() {
    }

    ngOnInit() {
        // this.firstObsSubscription = interval(1000).subscribe((count) => {
        //     console.log(count);
        // });

        // real custom observable
        const customIntervalObs: Observable<number> = new Observable<number>(observer => {

            let count = 0;

            setInterval(() => {
                observer.next(count);

                if (count === 5) {
                    observer.complete();
                }

                if (count > 3) {
                    observer.error(new Error('Count is greater 3!'));
                }

                count++;
                // observer.error();
                // observer.complete();
            }, 1000);
        });

        this.firstObsSubscription = customIntervalObs.pipe(
            filter((data: number) => {
                return data % 2 === 0;
            }),
            map((data: number) => {
                return 'Round: ' + (data + 1);
            })
        ).subscribe(
            (count: string) => {
                console.log(count);
            }, (error) => {
                console.log(error);
                alert(error.message);
            }, () => {
                console.log('Completed');
            }
        );
    }

    ngOnDestroy() {
        this.firstObsSubscription.unsubscribe();
    }
}

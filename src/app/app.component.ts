import {Component, OnDestroy, OnInit} from '@angular/core';

import {UserService} from './user.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

    userActivated = false;
    private sub: Subscription;

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.sub = this.userService.activatedEmitter.subscribe((didActivated: boolean) => {
            this.userActivated = didActivated;
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}

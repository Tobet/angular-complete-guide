import {Component, OnDestroy, OnInit} from '@angular/core';

import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";
import {User} from "../auth/user.model";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

    collapsed = true;

    isAuthenticated = false;

    private userSub: Subscription;

    constructor(private dataStorageService: DataStorageService,
                private authService: AuthService) {
    }

    ngOnInit(): void {

        // if we have a user we are logged in
        this.userSub = this.authService.user.subscribe(
            (user: User) => this.isAuthenticated = !!user
        )
    }

    onSaveData() {
        this.dataStorageService.storeRecipes();
    }

    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe();
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
}

import {Component, OnDestroy, OnInit} from '@angular/core';

import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

import * as fromApp from '../store/app.reducer';
import {User} from '../auth/user.model';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

    collapsed = true;

    isAuthenticated = false;

    private userSub: Subscription;

    constructor(private store: Store<fromApp.AppState>) {
    }

    ngOnInit(): void {

        // if we have a user we are logged in
        this.userSub = this.store
            .select('auth')
            .pipe(map(authState => authState.user))
            .subscribe(
                (user: User) => this.isAuthenticated = !!user
            );
    }

    onSaveData() {
        // this.dataStorageService.storeRecipes();
        this.store.dispatch(new RecipeActions.StoreRecipes());
    }

    onFetchData() {
        // this.dataStorageService.fetchRecipes().subscribe();
        this.store.dispatch(new RecipeActions.FetchRecipes());
    }

    onLogout() {
        this.store.dispatch(new AuthActions.Logout());
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
}

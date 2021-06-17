import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

import {throwError} from 'rxjs';
import {Store} from '@ngrx/store';

import {User} from './user.model';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import {Router} from '@angular/router';

export interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean,
}

@Injectable({providedIn: 'root'})
export class AuthService {

    tokenExpirationTimer: any;

    constructor(private store: Store<fromApp.AppState>,
                private router: Router) {
    }

    autoLogin() {

        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpiration: string
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return;
        }

        const loadedUser: User = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpiration));

        if (loadedUser.token) {
            // this.user.next(loadedUser);
            this.store.dispatch(new AuthActions.AuthSuccess({
                email: loadedUser.email,
                userId: loadedUser.id,
                token: loadedUser.token,
                expirationDate: new Date(userData._tokenExpiration),
            }));
            const expirationDuration: number = new Date(userData._tokenExpiration).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout() {

        // this.user.next(null);
        this.store.dispatch(new AuthActions.Logout());
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');

        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }

        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => this.logout(), expirationDuration);
    }

    /**
     * Handle authetication
     * @param email
     * @param userId
     * @param token
     * @param expiresIn
     * @private
     */
    private handleAuth(email: string, userId: string, token: string, expiresIn: number) {

        const expirationDate: Date = new Date(new Date().getTime() + +expiresIn * 1000); // expiresIn is in seconds, we have to convert it to milliseconds
        const user = new User(email, userId, token, expirationDate);

        // this.user.next(user);
        this.store.dispatch(new AuthActions.AuthSuccess({
            email: email,
            userId: userId,
            token: token,
            expirationDate: expirationDate,
        }));

        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    /**
     * Centralized function for error handling on login
     * @param errorRes
     * @private
     */
    private handleError(errorRes: HttpErrorResponse) {

        let errorMessage: string = 'An unknown error occured';

        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }

        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS' : {
                errorMessage = 'This email exists already';
                break;
            }
            case 'INVALID_PASSWORD':
            case 'EMAIL_NOT_FOUND' : {
                errorMessage = 'Wrong login credentials';
                break;
            }
        }

        return throwError(errorMessage);
    }
}

import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {User} from './user.model';
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

    private signupUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDvtNeudQ114O-1uy671_ORQ9Cc0C11Z2w';
    private loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDvtNeudQ114O-1uy671_ORQ9Cc0C11Z2w';

    user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
    tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router) {
    }

    signup(email: string, password: string): Observable<AuthResponseData> {

        return this.http.post<AuthResponseData>(
            this.signupUrl,
            {email: email, password: password, returnSecureToken: true}
        ).pipe(
            catchError(this.handleError),
            tap((resData: AuthResponseData) => {
                this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            })
        );
    }

    login(email: string, password: string): Observable<AuthResponseData> {
        return this.http.post<AuthResponseData>(
            this.loginUrl,
            {email: email, password: password, returnSecureToken: true}
        ).pipe(
            catchError(this.handleError),
            tap((resData: AuthResponseData) => {
                this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            })
        );
    }

    autoLogin() {

        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return;
        }

        const loadedUser: User = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration: number = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout() {

        this.user.next(null);
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

        this.user.next(user);
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

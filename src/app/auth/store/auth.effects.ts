import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {of} from 'rxjs';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';

import {User} from '../user.model';
import * as AuthActions from './auth.actions';
import {AuthService} from '../auth.service';
import {environment} from '../../../environments/environment';

 interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean,
}

const handleAuth = (expiresIn: number, email: string, userId: string, token: string) => {

    // expiresIn is in seconds, we have to convert it to milliseconds
    const expirationDate: Date = new Date(
        new Date().getTime() + +expiresIn * 1000
    );

    const user: User = new User(email, userId, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));

    return new AuthActions.AuthSuccess({
        email: email,
        userId: userId,
        token: token,
        expirationDate: expirationDate
    });
};

const handleError = (errorRes: any) => {

    let errorMessage: string = 'An unknown error occured';

    if (!errorRes.error || !errorRes.error.error) {
        return of(new AuthActions.AuthFail(errorMessage));
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

    return of(new AuthActions.AuthFail(errorMessage));
};

/**
 * actions is one big observable that allows us to access all dispatched actions so we can react
 * here we don't change state but execute the other code
 * because is a good practice to not execute async and side effects out of the reducers
 */
@Injectable()
export class AuthEffects {

    private loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey;
    private signupUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey;

    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupAction: AuthActions.SignupStart) => {
            return this.http.post<AuthResponseData>(
                this.signupUrl,
                {
                    email: signupAction.payload.email,
                    password: signupAction.payload.password,
                    returnSecureToken: true
                }
            ).pipe( //calling on inner obs!
                tap(resData => {
                    this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                }),
                map((resData: AuthResponseData) => {
                    // we must return a new actions, without dispatching because effect will do it for us
                    return handleAuth(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
                }),
                catchError(errorRes => {
                    // we must return a non error obs to not kill the stream
                    // catchError does not wraps return into observable
                    return handleError(errorRes);
                }),
            );
        })
    );

    /// don't have to subscribe. Ngrx effects will do the subscription
    // an effect have to return an actions because without that will not update the state
    // this is an observable stream that must never die (can't use catch error that kills the obs)
    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START), // only this actions will activate the chain
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http.post<AuthResponseData>(
                this.loginUrl,
                {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }
            ).pipe( //calling on inner obs!
                tap(resData => {
                    this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                }),
                map((resData: AuthResponseData) => {
                    // we must return a new actions, without dispatching because effect will do it for us
                    return handleAuth(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
                }),
                catchError(errorRes => {
                    // we must return a non error obs to not kill the stream
                    // catchError does not wraps return into observable
                    return handleError(errorRes);
                }),
            );
        })
    );

    // tipically effects return new actions that ngrx will automatically dispatch
    // this is not the case
    @Effect({dispatch: false})
    authRedirect = this.actions$.pipe(
        ofType(AuthActions.AUTH_SUCCESS),
        tap(() => this.router.navigate(['/']))
    );

    @Effect({dispatch: false})
    authLogout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
            this.authService.clearLogoutTimer();
            localStorage.removeItem('userData');
            this.router.navigate(['/'])
        })
    );

    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(() => {

            const userData: {
                email: string,
                id: string,
                _token: string,
                _tokenExpiration: string
            } = JSON.parse(localStorage.getItem('userData'));

            if (!userData) {
                return {type: 'DUMMY'};
            }

            const loadedUser: User = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpiration));

            if (loadedUser.token) {

                const expirationDuration: number = new Date(userData._tokenExpiration).getTime() - new Date().getTime();

                this.authService.setLogoutTimer(expirationDuration);

                return new AuthActions.AuthSuccess(
                    {
                        email: loadedUser.email,
                        userId: loadedUser.id,
                        token: loadedUser.token,
                        expirationDate: new Date(userData._tokenExpiration),
                    }
                );

                // this.autoLogout(expirationDuration);
            }

            return {type: 'DUMMY'};
        })
    );

    constructor(private actions$: Actions,
                private http: HttpClient,
                private router: Router,
                private authService: AuthService) {
    }
}

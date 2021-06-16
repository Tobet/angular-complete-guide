import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {of} from 'rxjs';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';

import * as AuthActions from './auth.actions';
import {AuthResponseData} from '../auth.service';
import {environment} from '../../../environments/environment';

/**
 * actions is one big observable that allows us to access all dispatched actions so we can react
 * here we don't change state but execute the other code
 * because is a good practice to not execute async and side effects out of the reducers
 */
@Injectable()
export class AuthEffects {

    private loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey;

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
                map((resData: AuthResponseData) => {
                    // we must return a new actions, without dispatching because effect will do it for us

                    // expiresIn is in seconds, we have to convert it to milliseconds
                    const expirationDate: Date = new Date(
                        new Date().getTime() + +resData.expiresIn * 1000
                    );

                    return of(
                        new AuthActions.Login({
                            email: resData.email,
                            userId: resData.localId,
                            token: resData.idToken,
                            expirationDate: expirationDate
                        })
                    );
                }),
                catchError(error => {
                    // we must return a non error obs to not kill the stream
                    return of();
                }),
            );
        })
    );

    constructor(private actions$: Actions,
                private http: HttpClient) {
    }
}

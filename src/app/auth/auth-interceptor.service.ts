import {HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";

import {exhaustMap, map, take} from 'rxjs/operators';
import {Store} from '@ngrx/store';

import {User} from "./user.model";
import {AuthService} from "./auth.service";
import * as fromApp from '../store/app.reducer'
import {AuthState} from './store/auth.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService,
                private store: Store<fromApp.AppState>) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        return this.store.select('auth').pipe(
            take(1),
            map((authState: AuthState) => {
                return authState.user;
            }),
            exhaustMap((user: User) => {

                if (!user) {
                    return next.handle(req);
                }

                const modifiedRequest: HttpRequest<any> = req.clone({params: new HttpParams().set('auth', user.token)})
                return next.handle(modifiedRequest);
            })
        )
    }
}

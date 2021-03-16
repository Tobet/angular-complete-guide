import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
}

@Injectable({providedIn: 'root'})
export class AuthService {

    private signupUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDvtNeudQ114O-1uy671_ORQ9Cc0C11Z2w';

    constructor(private http: HttpClient) {
    }

    signup(email: string, password: string): Observable<AuthResponseData> {

        return this.http.post<AuthResponseData>(
            this.signupUrl,
            {email: email, password: password, returnSecureToken: true}
        );
    }
}

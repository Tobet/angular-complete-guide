import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';

import {Observable} from 'rxjs';

import {AuthResponseData, AuthService} from './auth.service';
import {Router} from "@angular/router";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
})
export class AuthComponent {

    isLoginMode = true;
    isLoading = false;
    error: string;

    constructor(private authService: AuthService,
                private router: Router) {
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        console.log('on submit auth', form);

        if (form.invalid) {
            return;
        }

        const email = form.value.email;
        const password = form.value.password;

        this.isLoading = true;

        let auth$: Observable<AuthResponseData>;

        if (this.isLoginMode) {
            auth$ = this.authService.login(email, password);
        } else {
            auth$ = this.authService.signup(email, password);
        }

        auth$.subscribe(
            (resData: AuthResponseData) => {
                console.log(resData);
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            },
            errorMessage => {
                console.error(errorMessage);
                this.error = errorMessage;
                this.isLoading = false;
            }
        );

        form.reset();
    }
}

import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';

import {AuthResponseData, AuthService} from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
})
export class AuthComponent {

    isLoginMode = true;
    isLoading = false;
    error: string;

    constructor(private authService: AuthService) {
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

        if (this.isLoginMode) {
            // ...
        } else {
            this.authService.signup(email, password).subscribe(
                (resData: AuthResponseData) => {
                    console.log(resData);
                    this.isLoading = false;
                },
                errorMessage => {
                    console.error(errorMessage);
                    this.error = errorMessage;
                    this.isLoading = false;
                }
            );
        }

        form.reset();
    }
}

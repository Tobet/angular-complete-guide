import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';

import {AuthResponseData, AuthService} from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
})
export class AuthComponent {

    isLoginMode = true;

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

        if (this.isLoginMode) {
            // ...
        } else {
            this.authService.signup(email, password).subscribe(
                (resData: AuthResponseData) => console.log(resData),
                error => console.error(error)
            );
        }

        form.reset();
    }
}

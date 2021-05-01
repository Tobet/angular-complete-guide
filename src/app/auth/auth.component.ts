import {
    Component,
    ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef, OnDestroy,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from "@angular/router";

import {Observable, Subscription} from 'rxjs';

import {AuthResponseData, AuthService} from './auth.service';
import {AlertComponent} from "../shared/alert/alert.component";
import {PlaceholderDirective} from "../shared/placeholder/placeholder.directive";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {

    isLoginMode = true;
    isLoading = false;
    error: string;

    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

    private closeSub: Subscription;

    constructor(private authService: AuthService,
                private componentFactoryResolver: ComponentFactoryResolver,
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
                this.showErrorAlert(errorMessage);
                this.isLoading = false;
            }
        );

        form.reset();
    }

    onHandleError() {
        this.error = null;
    }

    private showErrorAlert(message: string) {

        const alertComponentFactory: ComponentFactory<AlertComponent> = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

        const hostViewContainerRef: ViewContainerRef = this.alertHost.viewContainerRef;

        hostViewContainerRef.clear();

        const alertComponent: ComponentRef<AlertComponent> = hostViewContainerRef.createComponent(alertComponentFactory)
        alertComponent.instance.message = message;
        this.closeSub = alertComponent.instance.close.subscribe(
            () => {
                this.error = null;
                hostViewContainerRef.clear();
            },
        )
    }

    ngOnDestroy(): void {

        if (this.closeSub) {
            this.closeSub.unsubscribe();
        }
    }
}

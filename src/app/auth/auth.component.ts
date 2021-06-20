import {
    Component,
    ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef, OnDestroy, OnInit,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {NgForm} from '@angular/forms';

import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import {AlertComponent} from '../shared/alert/alert.component';
import {PlaceholderDirective} from '../shared/placeholder/placeholder.directive';
import {AuthState} from './store/auth.reducer';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit, OnDestroy {

    isLoginMode = true; // this only matter in this component -> do not put in ngrx store
    isLoading = false;
    error: string;

    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

    private closeSub: Subscription;
    private storeSub: Subscription;

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private store: Store<fromApp.AppState>) {
    }

    ngOnInit() {

        this.storeSub = this.store.select('auth').subscribe(
            (authState: AuthState) => {

                this.isLoading = authState.loading;
                this.error = authState.authError;

                if (this.error) {
                    this.showErrorAlert(this.error);
                }
            }
        );
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        // console.log('on submit auth', form);

        if (form.invalid) {
            return;
        }

        const email = form.value.email;
        const password = form.value.password;

        if (this.isLoginMode) {
            this.store.dispatch(new AuthActions.LoginStart({email: email, password: password}));
        } else {
            this.store.dispatch(new AuthActions.SignupStart({email: email, password: password}));
        }

        form.reset();
    }

    onHandleError() {
        this.store.dispatch(new AuthActions.ClearError());
    }

    private showErrorAlert(message: string) {

        const alertComponentFactory: ComponentFactory<AlertComponent> = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

        const hostViewContainerRef: ViewContainerRef = this.alertHost.viewContainerRef;

        hostViewContainerRef.clear();

        const alertComponent: ComponentRef<AlertComponent> = hostViewContainerRef.createComponent(alertComponentFactory);
        alertComponent.instance.message = message;
        this.closeSub = alertComponent.instance.close.subscribe(
            () => {
                this.error = null;
                hostViewContainerRef.clear();
            },
        );
    }

    ngOnDestroy(): void {

        if (this.closeSub) {
            this.closeSub.unsubscribe();
        }

        if (this.storeSub) {
            this.storeSub.unsubscribe();
        }
    }
}

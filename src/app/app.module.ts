import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {CoreModule} from './core.module';
import {AppComponent} from './app.component';
import {LoggingService} from './logging.service';
import {SharedModule} from './shared/shared.module';
import {AppRoutingModule} from './app-routing.module';
import {HeaderComponent} from './header/header.component';
import * as fromApp from './store/app.reducer';
import {AuthEffects} from './auth/store/auth.effects';
import {environment} from '../environments/environment';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {RecipeEffects} from './recipes/store/recipe.effects';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        SharedModule,
        CoreModule,
        StoreModule.forRoot(fromApp.appReducer),
        EffectsModule.forRoot([AuthEffects, RecipeEffects]),
        StoreDevtoolsModule.instrument({logOnly: environment.production}),
        StoreRouterConnectingModule.forRoot(),
    ],
    bootstrap: [AppComponent],
    providers: [LoggingService]
})
export class AppModule {
}

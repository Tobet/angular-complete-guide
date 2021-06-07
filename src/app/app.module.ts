import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {StoreModule} from '@ngrx/store';

import {CoreModule} from './core.module';
import {AppComponent} from './app.component';
import {LoggingService} from './logging.service';
import {SharedModule} from './shared/shared.module';
import {AppRoutingModule} from './app-routing.module';
import {HeaderComponent} from './header/header.component';
import {shoppingListReducer} from './shopping-list/shopping-list-edit/store/shopping-list.reducer';

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
        StoreModule.forRoot({shoppingList: shoppingListReducer})
    ],
    bootstrap: [AppComponent],
    providers: [LoggingService]
})
export class AppModule {
}

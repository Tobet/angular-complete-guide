import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {AppRoutingModule} from './app-routing.module';
import {HeaderComponent} from './header/header.component';
import {DropdownDirective} from './shared/dropdown.directive';
import {AlertComponent} from "./shared/alert/alert.component";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";
import {ShoppingListService} from './shopping-list/shopping-list.service';
import {PlaceholderDirective} from "./shared/placeholder/placeholder.directive";
import {LoadingSpinnerComponent} from "./shared/loading-spinner/loading-spinner.component";
import {RecipesModule} from "./recipes/recipes.module";
import {RecipeService} from "./recipes/recipe.service";
import {ShoppingListModule} from "./shopping-list/shopping-list.module";

@NgModule({
    declarations: [
        AppComponent,
        // header
        HeaderComponent,
        // directives
        DropdownDirective,
        PlaceholderDirective,
        // auth
        AuthComponent,
        // misc
        LoadingSpinnerComponent,
        AlertComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        RecipesModule,
        ShoppingListModule
    ],
    providers: [
        RecipeService,
        ShoppingListService,
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

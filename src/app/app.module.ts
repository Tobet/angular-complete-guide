import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {RecipesComponent} from './recipes/recipes.component';
import {DropdownDirective} from './shared/dropdown.directive';
import {ShoppingListService} from './shopping-list/shopping-list.service';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import {RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';
import {RecipeItemComponent} from './recipes/recipe-list/recipe-item/recipe-item.component';
import {ShoppingListEditComponent} from './shopping-list/shopping-list-edit/shopping-list-edit.component';

@NgModule({
    declarations: [
        AppComponent,
        // header
        HeaderComponent,
        // shopping
        ShoppingListComponent,
        ShoppingListEditComponent,
        // recipes
        RecipesComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailComponent,
        // directives
        DropdownDirective
    ],
    imports: [
        BrowserModule,
        FormsModule,
    ],
    providers: [ShoppingListService],
    bootstrap: [AppComponent]
})
export class AppModule {
}

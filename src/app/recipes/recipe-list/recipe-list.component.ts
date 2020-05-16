import {Component, EventEmitter, Output} from '@angular/core';

import {Recipe} from '../recipe.model';

@Component({
    selector: 'app-recipes-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {

    @Output() recipeListItemSelected: EventEmitter<Recipe> = new EventEmitter<Recipe>();

    recipes: Recipe[] = [
        new Recipe('RECIPE 1', 'Spaghetti al ragù', 'https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21.jpg'),
        new Recipe('RECIPE 2', 'Soffritto di palle', 'https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21.jpg'),
    ];

    onRecipeItemSelection(recipe: Recipe) {
        this.recipeListItemSelected.emit(recipe);
    }
}

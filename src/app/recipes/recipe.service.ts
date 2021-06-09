import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Store} from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/shopping-list-edit/store/shopping-list.actions';
import * as fromShoppingList from '../shopping-list/shopping-list-edit/store/shopping-list.reducer';

@Injectable()
export class RecipeService {

    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'RECIPE 1',
    //         'Spaghetti al ragù',
    //         'https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21.jpg',
    //         [
    //             new Ingredient('Meat', 1),
    //             new Ingredient('French Fries', 20)
    //         ]),
    //     new Recipe(
    //         'RECIPE 2',
    //         'Soffritto di palle',
    //         'https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21.jpg',
    //         [
    //             new Ingredient('Buns', 2),
    //             new Ingredient('Meat', 1),
    //         ]
    //     ),
    // ];

    private recipes: Recipe[] = [];

    recipesChanged: Subject<Recipe[]> = new Subject<Recipe[]>();

    constructor(private shoppingListService: ShoppingListService,
                private store: Store<fromShoppingList.AppState>) {
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(recipes);
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        // this.shoppingListService.addIngredients(ingredients);
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}

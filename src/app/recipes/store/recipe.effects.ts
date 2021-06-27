import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';

import * as RecipesActions from './recipe.actions';
import {Recipe} from '../recipe.model';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects {

    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        switchMap(() => {
            return this.http.get<Recipe[]>(
                'https://food-app-78129-default-rtdb.firebaseio.com/recipes.json',
            );
        }),
        map((recipes: Recipe[]) => {
            return recipes.map((recipe: Recipe) => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            });
        }),
        map((recipes: Recipe[]) => {
            return new RecipesActions.SetRecipes(recipes);
        })
    );

    @Effect({dispatch: false})
    storeRecipes = this.actions$.pipe(
        ofType(RecipesActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipesState]) => { // array destructuring syntax that store array element in variables
            return this.http.put('https://food-app-78129-default-rtdb.firebaseio.com/recipes.json', recipesState.recipes);
        })
    );

    constructor(private actions$: Actions,
                private http: HttpClient,
                private store: Store<fromApp.AppState>) {
    }
}

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import {Actions, ofType} from '@ngrx/effects';
import {map, switchMap, take} from 'rxjs/operators';

import {Recipe} from './recipe.model';
import * as fromApp from '../store/app.reducer';
import {RecipeState} from './store/recipe.reducer';
import * as RecipesActions from './store/recipe.actions';

/**
 * Used to retrieve the latest informations about recipes when routing on it
 */
@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {

    constructor(private store: Store<fromApp.AppState>,
                private actions$: Actions) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {

        // const recipes = this.recipeService.getRecipes();
        //
        // if (recipes.length === 0) {
        //     return this.dataStorageService.fetchRecipes();
        // } else {
        //     return this.dataStorageService.fetchRecipes();
        // }

        return this.store.select('recipes').pipe(
            take(1),
            map((recipesState: RecipeState) => {
                return recipesState.recipes;
            }),
            switchMap((recipes: Recipe[]) => {

                if (recipes.length === 0) {

                    this.store.dispatch(new RecipesActions.FetchRecipes()); // we have to wait for this then return an observable like resolve metod wants

                    return this.actions$.pipe(
                        ofType(RecipesActions.SET_RECIPES),
                        take(1) // only interested once
                    );
                } else {

                    return of(recipes);
                }
            })
        );
    }
}

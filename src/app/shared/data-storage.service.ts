import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {exhaustMap, map, take, tap} from 'rxjs/operators';

import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {AuthService} from "../auth/auth.service";
import {User} from "../auth/user.model";

@Injectable({providedIn: 'root'})
export class DataStorageService {

    constructor(private http: HttpClient,
                private recipeService: RecipeService,
                private authService: AuthService) {
    }

    storeRecipes() {

        // here we user an interceptor
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://food-app-78129-default-rtdb.firebaseio.com/recipes.json', recipes)
            .subscribe(
                (res) => {
                    console.log(res);
                },
                error => console.error(error)
            );
    }

    fetchRecipes() {

        // take(1) take only 1 value and unsubscribe
        // exhaustMap waits for the first obs to complete and return a new obs
        // that replace the previous in the chain
        // return this.authService.user.pipe(
        //     take(1),
        //     exhaustMap((user: User) => {
        //         return this.http.get<Recipe[]>(
        //             'https://food-app-78129-default-rtdb.firebaseio.com/recipes.json',
        //             {
        //                 params: new HttpParams().set('auth', user.token)
        //             }
        //         )
        //     }),
        //     map((recipes: Recipe[]) => {
        //         return recipes.map((recipe: Recipe) => {
        //             return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        //         });
        //     }),
        //     tap((recipes) => {
        //         this.recipeService.setRecipes(recipes);
        //     })
        // );

        // now we use an interceptor
        return this.http.get<Recipe[]>(
            'https://food-app-78129-default-rtdb.firebaseio.com/recipes.json',
        ).pipe(
            map((recipes: Recipe[]) => {
                return recipes.map((recipe: Recipe) => {
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
                });
            }),
            tap((recipes) => {
                this.recipeService.setRecipes(recipes);
            })
        )
    }
}

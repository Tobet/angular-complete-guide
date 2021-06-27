import {Recipe} from '../recipe.model';
import * as RecipesActions from './recipe.actions';
import {DELETE_RECIPES} from './recipe.actions';

export interface RecipeState {
    recipes: Recipe[];
}

const initialState: RecipeState = {
    recipes: [],
};

export function recipeReducer(state: RecipeState = initialState, action: RecipesActions.RecipesActions): RecipeState {

    switch (action.type) {
        case RecipesActions.SET_RECIPES: {
            return {
                ...state,
                recipes: [...action.payload]
            };
        }
        case RecipesActions.ADD_RECIPES: {
            return {
                ...state,
                recipes: [...this.state.recipes, action.payload]
            };
        }
        case RecipesActions.UPDATE_RECIPES: {

            const updatedRecipe: Recipe = {
                ...state.recipes[action.payload.index],
                ...action.payload.newRecipe
            };

            const updatedRecipes: Recipe[] = [...state.recipes];
            updatedRecipes[action.payload.index] = updatedRecipe;


            return {
                ...state,
                recipes: updatedRecipes,
            };
        }
        case RecipesActions.DELETE_RECIPES: {
            return {
                ...state,
                recipes: state.recipes.filter((recipe: Recipe, index: number) => {
                    return index !== action.payload;
                })
            };
        }
        default :
            return state;
    }
}

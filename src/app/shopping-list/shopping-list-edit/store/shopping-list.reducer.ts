import {Ingredient} from '../../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ]
};

export function shoppingListReducer(state: { ingredients: Ingredient[] } = initialState, action: ShoppingListActions.ShoppingListActions) {

    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT: {
            // never touch the existing state, ngrx have to return immutable state objects
            return {
                ...state, // it is a good practice to return old state
                ingredients: [...state.ingredients, action.payload], // spread operator pull outs items from originale state
            };
        }
        case ShoppingListActions.ADD_INGREDIENTS: {
            return {
                ...state,
                ingredients: [...this.state.ingredients, ...action.payload],
            };
        }
        case ShoppingListActions.UPDATE_INGREDIENT: {

            const ingredientToEdit: Ingredient = state.ingredients[action.payload.index];
            // would be incorrect to update this object because would edit old state, not allowed in ngrx

            const updatedIngredient: Ingredient = {
                ...ingredientToEdit, // copy first
                ...action.payload.ingredient // override copied
            };

            const updatedIngredients: Ingredient[] = [...state.ingredients];
            updatedIngredients[action.payload.index] = updatedIngredient;

            return {
                ...state,
                ingredients: updatedIngredients,
            };
        }
        case ShoppingListActions.DELETE_INGREDIENT: {
            return {
                ...state,
                ingredients: this.state.ingredients.filter((ingredient: Ingredient, index: number) => {
                    return index !== action.payload;
                }), // we can use filter becasue retuns a new array (immutability maintained)
            };
        }
        default : {
            return state;
        }
    }
}

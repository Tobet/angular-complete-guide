import {Ingredient} from '../../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ]
};

export function shoppingListReducer(state: { ingredients: Ingredient[] } = initialState, action: ShoppingListActions.AddIngredient) {

    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT: {
            // never touch the existing state, ngrx have to return immutable state objects
            return {
                ...state, // it is a good practice to return old state
                ingredients: [...state.ingredients, action.payload], // spread operator pull outs items from originale state
            };
        }
        default : {
            return state;
        }
    }
}

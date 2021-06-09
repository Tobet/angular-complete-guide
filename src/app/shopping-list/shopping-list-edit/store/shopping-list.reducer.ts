import {Ingredient} from '../../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface AppState {
    shoppingList: ShoppingListState,
}

export interface ShoppingListState {
    ingredients: Ingredient[],
    editedIngredient: Ingredient,
    editedIngredientIndex: number,
}

const initialState: ShoppingListState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ],
    editedIngredient: null,
    editedIngredientIndex: -1,
};

export function shoppingListReducer(state: ShoppingListState = initialState, action: ShoppingListActions.ShoppingListActions) {

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

            const ingredientToEdit: Ingredient = state.ingredients[state.editedIngredientIndex];
            // would be incorrect to update this object because would edit old state, not allowed in ngrx

            const updatedIngredient: Ingredient = {
                ...ingredientToEdit, // copy first
                ...action.payload // override copied
            };

            const updatedIngredients: Ingredient[] = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

            return {
                ...state,
                ingredients: updatedIngredients,
                editedIngredientIndex: -1,
                editedIngredient: null,
            };
        }
        case ShoppingListActions.DELETE_INGREDIENT: {
            return {
                ...state,
                ingredients: this.state.ingredients.filter((ingredient: Ingredient, index: number) => {
                    return index !== state.editedIngredientIndex;
                }), // we can use filter becasue retuns a new array (immutability maintained)
                editedIngredientIndex: -1,
                editedIngredient: null,
            };
        }
        case ShoppingListActions.START_EDIT: {
            return {
                ...state,
                editedIngredientIndex: action.payload,
                // editedIngredient: state.ingredients[action.payload], // not ok, is the reference of the object
                editedIngredient: {...state.ingredients[action.payload]}
            };
        }
        case ShoppingListActions.STOP_EDIT: {
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1,
            };
        }
        default : {
            return state;
        }
    }
}
